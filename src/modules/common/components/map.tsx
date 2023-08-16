import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, StandaloneSearchBox } from "@react-google-maps/api";
import { TextInput } from "@mantine/core";
import ubigeoPeru, { UbigeoEntry } from "ubigeo-peru";

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

function normalizeString(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

interface MapProps {
  onSelectPlace: (place: Place | null) => void;
}

export const MapForm: React.FC<MapProps> = ({ onSelectPlace }) => {
  const [availableDistricts, setAvailableDistrict] = useState<UbigeoEntry[]>(
    []
  );
  const [selectedPlaceName, setSelectedPlaceName] = useState("");
  const [, setMap] = useState<google.maps.Map | null>(null);
  const [searchBox, setSearchBox] =
    useState<google.maps.places.SearchBox | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [zoom, setZoom] = useState(15);
  const [center, setCenter] = useState({
    lat: -12.135609160664332,
    lng: -77.02211591070116,
  });

  useEffect(() => {
    const data = ubigeoPeru.reniec.filter((r) => r.distrito != "00");
    setAvailableDistrict(data);
  }, []);

  const handleLoadMap = (map: google.maps.Map) => {
    setMap(map);
  };

  const handleLoadSearchBox = (ref: google.maps.places.SearchBox) => {
    setSearchBox(ref);
  };

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`
      );
      const data: ReverseGeocodeResponse = await response.json();
      return data.results;
    } catch (error) {
      console.error("Error in reverse geocoding:", error);
      return null;
    }
  };

  const handlePlaceChanged = async () => {
    if (searchBox && searchBox?.getPlaces()) {
      const placeRaw = searchBox.getPlaces();
      if (!placeRaw) return;
      const place = placeRaw[0];
      if (place) {
        const lat = place.geometry?.location?.lat() || 0;
        const lng = place.geometry?.location?.lng() || 0;

        // Usa la geocodificación inversa para obtener la información completa
        const fullPlaceData = await reverseGeocode(lat, lng);
        const districtComponent = fullPlaceData?.filter(
          (component) =>
            component.types.includes("administrative_area_level_3") ||
            component.types.includes("locality")
        );

        const posibleDistricts = districtComponent?.map(
          (d) => d.address_components.at(0)?.short_name
        );

        let districtValue;
        if (posibleDistricts) {
          for (let posibleDistrict of posibleDistricts) {
            const normalizedDistrict = normalizeString(posibleDistrict ?? "");
            districtValue = availableDistricts.find(
              (a) => normalizeString(a.nombre) === normalizedDistrict
            );
            if (districtValue) break;
          }
        }

        if (districtValue) {
          const newSelectedPlace: Place = {
            id: place.place_id || "",
            district: districtValue,
            name: place?.formatted_address || "",
            location: {
              lat: lat,
              lng: lng,
            },
          };
          setSelectedPlaceName(place.formatted_address ?? place.name ?? "");
          setSelectedPlace(newSelectedPlace);
          onSelectPlace(newSelectedPlace);
        }

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
      // Usa la geocodificación inversa para obtener la información completa
      const fullPlaceData = await reverseGeocode(lat, lng);
      if (fullPlaceData) {
        const place = fullPlaceData[0];
        const districtComponent = fullPlaceData?.filter(
          (component) =>
            component.types.includes("administrative_area_level_3") ||
            component.types.includes("locality")
        );

        const posibleDistricts = districtComponent?.map(
          (d) => d.address_components.at(0)?.short_name
        );

        let districtValue;
        if (posibleDistricts) {
          for (let posibleDistrict of posibleDistricts) {
            const normalizedDistrict = normalizeString(posibleDistrict ?? "");
            districtValue = availableDistricts.find(
              (a) => normalizeString(a.nombre) === normalizedDistrict
            );
            if (districtValue) break;
          }
        }

        if (districtValue) {
          const newSelectedPlace: Place = {
            id: place.place_id || "",
            district: districtValue,
            name: place?.formatted_address || "",
            location: {
              lat: lat,
              lng: lng,
            },
          };
          setSelectedPlaceName(newSelectedPlace.name);
          setSelectedPlace(newSelectedPlace);
          onSelectPlace(newSelectedPlace);
        }
        setCenter({
          lat: lat,
          lng: lng,
        });
        setZoom(18);
      }
    } catch (error) {
      console.error("Error retrieving place information:", error);
    }
  };
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
        <TextInput
          label="Dirección"
          mb={10}
          value={selectedPlaceName}
          onChange={(e) => setSelectedPlaceName(e.target.value)}
        />
      </StandaloneSearchBox>
      <GoogleMap
        mapContainerStyle={{ height: "400px", width: "100%" }}
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
