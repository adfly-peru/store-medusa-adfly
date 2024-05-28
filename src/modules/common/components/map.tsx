import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, StandaloneSearchBox } from "@react-google-maps/api";
import ubigeoPeru, { UbigeoEntry } from "ubigeo-peru";
import { FormControl, InputLabel, TextField } from "@mui/material";

export interface AddressInfo {
  address: string;
  lat: number;
  lng: number;
  district: string;
  province: string;
  department: string;
}

export interface Place {
  id: string;
  name: string;
  district: UbigeoEntry;
  location: {
    lat: number;
    lng: number;
  };
}

interface GeocodeResult {
  address_components: {
    long_name: string;
    short_name: string;
    types: string[];
  }[];
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
    location_type: string;
    viewport: {
      northeast: {
        lat: number;
        lng: number;
      };
      southwest: {
        lat: number;
        lng: number;
      };
    };
  };
  place_id: string;
  plus_code?: {
    compound_code?: string;
    global_code: string;
  };
  types: string[];
}

interface ReverseGeocodeResponse {
  results: GeocodeResult[];
  status: string;
}

function normalizeString(s: string) {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function cleanAndNormalize(name: string) {
  // Lista de palabras a eliminar
  const wordsToRemove = [
    "provincia de",
    "departamento de",
    "distrito de",
    "gobierno regional de",
  ];

  let cleanedName = name.toLowerCase();

  wordsToRemove.forEach((word) => {
    cleanedName = cleanedName.replace(word, "");
  });

  return cleanedName.trim();
}

const filterByType = (data: GeocodeResult[], types: string[]) =>
  data.filter((component) => types.some((t) => component.types.includes(t)));

const extractNames = (components: GeocodeResult[]) =>
  components.map((d) =>
    cleanAndNormalize(d.address_components.at(0)?.short_name ?? "")
  );

const findUbigeoMatch = (
  availableList: UbigeoEntry[],
  possibleNames: string[]
) => {
  for (let name of possibleNames) {
    const normalized = normalizeString(name ?? "");
    const matches = availableList.filter(
      (a) => normalizeString(a.nombre) === normalized
    );
    if (matches.length > 0) return matches;
  }
  return [];
};

interface MapProps {
  defaultPlace?: Place;
  onSelectPlace: (place: Place | null) => void;
}

export const MapForm: React.FC<MapProps> = ({
  defaultPlace,
  onSelectPlace,
}) => {
  const [availableDistricts, setAvailableDistrict] = useState<UbigeoEntry[]>(
    []
  );
  const [availableProvinces, setAvailableProvince] = useState<UbigeoEntry[]>(
    []
  );
  const [availableDepartments, setAvailableDepartment] = useState<
    UbigeoEntry[]
  >([]);
  const [selectedPlaceName, setSelectedPlaceName] = useState(
    defaultPlace?.name
  );
  const [, setMap] = useState<google.maps.Map | null>(null);
  const [searchBox, setSearchBox] =
    useState<google.maps.places.SearchBox | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [zoom, setZoom] = useState(15);
  const [center, setCenter] = useState({
    lat: defaultPlace?.location.lat ?? -12.135609160664332,
    lng: defaultPlace?.location.lng ?? -77.02211591070116,
  });

  const handleLoadMap = (map: google.maps.Map) => {
    setMap(map);
  };

  const handleLoadSearchBox = (ref: google.maps.places.SearchBox) => {
    setSearchBox(ref);
  };

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&language=es&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`
      );
      const data: ReverseGeocodeResponse = await response.json();
      return data.results;
    } catch (error) {
      console.error("Error in reverse geocoding:", error);
      return null;
    }
  };

  const resolveLocationData = async (
    lat: number,
    lng: number,
    place: google.maps.places.PlaceResult | null
  ) => {
    const fullPlaceData = await reverseGeocode(lat, lng);
    if (!fullPlaceData) return null;

    const districtComponent = filterByType(fullPlaceData, [
      "administrative_area_level_3",
      "locality",
    ]);
    const provinceComponent = filterByType(fullPlaceData, [
      "administrative_area_level_2",
    ]);
    const departmentComponent = filterByType(fullPlaceData, [
      "administrative_area_level_1",
    ]);

    const posibleDistricts = extractNames(districtComponent);
    const posibleProvinces = extractNames(provinceComponent);
    const posibleDepartments = extractNames(departmentComponent);

    let districtValues = findUbigeoMatch(availableDistricts, posibleDistricts);
    let provinceValues: UbigeoEntry[] = [];
    let departmentValues: UbigeoEntry[] = [];

    if (districtValues.length > 1) {
      provinceValues = findUbigeoMatch(availableProvinces, posibleProvinces);
      if (provinceValues.length > 1) {
        departmentValues = findUbigeoMatch(
          availableDepartments,
          posibleDepartments
        );
      }
    }

    if (districtValues.length > 1 && provinceValues.length > 0) {
      districtValues = districtValues.filter((d) =>
        provinceValues.some(
          (p) =>
            d.departamento === p.departamento && d.provincia === p.provincia
        )
      );
    }

    if (districtValues.length > 1 && departmentValues.length > 0) {
      districtValues = districtValues.filter((d) =>
        departmentValues.some((de) => d.departamento === de.departamento)
      );
    }

    const districtValue = districtValues.at(0);
    const placename =
      place?.formatted_address ??
      place?.name ??
      fullPlaceData[0].formatted_address ??
      "";
    if (districtValue) {
      const newSelectedPlace: Place = {
        id: place?.place_id ?? fullPlaceData[0].place_id ?? "",
        district: districtValue,
        name: placename,
        location: {
          lat: lat,
          lng: lng,
        },
      };
      setSelectedPlaceName(placename);
      setSelectedPlace(newSelectedPlace);
      onSelectPlace(newSelectedPlace);
    }

    return null;
  };

  const handlePlaceChanged = async () => {
    if (searchBox && searchBox?.getPlaces()) {
      const placeRaw = searchBox.getPlaces();
      if (!placeRaw) return;
      const place = placeRaw[0];
      if (place) {
        const lat = place.geometry?.location?.lat() || 0;
        const lng = place.geometry?.location?.lng() || 0;
        await resolveLocationData(lat, lng, place);
        setCenter({
          lat: lat,
          lng: lng,
        });
        setZoom(18);
      }
    }
  };

  const handleMapClick = async (event: google.maps.MapMouseEvent) => {
    const latLng = event?.latLng?.toJSON();
    const lat = latLng?.lat || 0;
    const lng = latLng?.lng || 0;
    try {
      await resolveLocationData(lat, lng, null);
      setCenter({
        lat: lat,
        lng: lng,
      });
      setZoom(18);
    } catch (error) {
      console.error("Error retrieving place information:", error);
    }
  };

  useEffect(() => {
    if (defaultPlace) {
      resolveLocationData(
        defaultPlace.location.lat,
        defaultPlace.location.lng,
        null
      );
      setZoom(18);
    }
  }, [defaultPlace]);

  useEffect(() => {
    const data1 = ubigeoPeru.reniec.filter((r) => r.distrito != "00");
    const data2 = ubigeoPeru.reniec.filter(
      (r) => r.provincia != "00" && r.distrito == "00"
    );
    const data3 = ubigeoPeru.reniec.filter(
      (r) => r.provincia == "00" && r.distrito == "00"
    );
    setAvailableDistrict(data1);
    setAvailableProvince(data2);
    setAvailableDepartment(data3);
  }, []);

  return (
    <div style={{}}>
      <StandaloneSearchBox
        onLoad={handleLoadSearchBox}
        onPlacesChanged={handlePlaceChanged}
        bounds={{
          south: -18.3485307,
          west: -81.4070283,
          north: -0.038446,
          east: -68.6770238,
        }}
      >
        <FormControl fullWidth size="small">
          <InputLabel
            sx={{
              color: "black",
              fontWeight: 600,
              top: "-20px",
              marginLeft: "-10px",
            }}
          >
            Dirección
          </InputLabel>
          <TextField
            size="small"
            sx={{
              marginTop: "10px",
              marginBottom: "10px",
            }}
            value={selectedPlaceName}
            onChange={(e) => setSelectedPlaceName(e.target.value)}
          />
        </FormControl>
      </StandaloneSearchBox>
      <GoogleMap
        mapContainerStyle={{
          height: "400px",
          width: "100%",
          marginTop: "30px",
        }}
        onLoad={handleLoadMap}
        center={center}
        zoom={zoom}
        onClick={handleMapClick}
      >
        {selectedPlace && (
          <Marker
            position={selectedPlace.location}
            onClick={() => setSelectedPlace(null)}
          />
        )}
      </GoogleMap>
    </div>
  );
};
