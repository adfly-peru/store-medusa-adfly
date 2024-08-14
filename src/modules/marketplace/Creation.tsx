import { Box, Button, Stack } from "@mui/material";
import CreationBar from "./components/CreationBar";
import { useForm } from "react-hook-form";
import { UbigeoEntry } from "ubigeo-peru";
import { MarketWorkplace } from "generated/graphql";
import DetailedMarketplaceItem from "./DetailedMarketplaceItem";
import { useState } from "react";
import MarketplaceItemCard from "./MarketplaceItemCard";
import { useAccount } from "@context/account-context";

export type MarketPlaceItemForm = {
  title: string;
  price: string; // number
  brand: string;
  status: { label: string; value: string } | null; // new used
  description: string;
  country: string;
  department: UbigeoEntry[];
  shipping_method: string[]; // door_delivery door_pick_up public_place_delivery workplace_delivery
  workplace_delivery: MarketWorkplace[];
  payment_method: string[]; // digital_wallet  cash  credit_card  other
  other_payment_method: string;
  valid_period: { label: string; value: string } | null; // days
  images: File[];
};

const MarketplaceCreation = () => {
  const { collaborator } = useAccount();
  const [view, setView] = useState<"card" | "detail">("detail");
  const methods = useForm<MarketPlaceItemForm>({
    defaultValues: {
      title: "",
      price: "",
      brand: "",
      status: null,
      description: "",
      country: "pe",
      department: [],
      shipping_method: [],
      workplace_delivery: [],
      payment_method: [],
      other_payment_method: "",
      valid_period: null,
      images: [],
    },
  });
  return (
    <Box
      sx={(theme) => ({
        paddingLeft: "27px",
        paddingRight: "27px",
        [theme.breakpoints.up("lg")]: {
          paddingLeft: "117px",
          paddingRight: "117px",
        },
        mt: 5,
        mb: 15,
      })}
    >
      <Stack
        sx={{
          width: "100%",
        }}
        justifyContent="space-between"
        spacing={{ xs: 2, md: 3 }}
        direction="row"
      >
        <CreationBar methods={methods} />
        <Box width="100%" overflow="auto">
          <Box
            borderRadius="10px"
            border="1px solid #C7CACD"
            p="20px"
            minWidth={820}
          >
            <Stack direction="row" gap="20px">
              <Button
                sx={{ width: 141, padding: 0 }}
                variant={view === "detail" ? "contained" : "outlined"}
                onClick={() => (view === "detail" ? null : setView("detail"))}
              >
                Vista de Producto
              </Button>
              <Button
                sx={{ width: 141, padding: 0 }}
                variant={view === "card" ? "contained" : "outlined"}
                onClick={() => (view === "card" ? null : setView("card"))}
              >
                Vista de Lista
              </Button>
            </Stack>
            {view === "detail" ? (
              <DetailedMarketplaceItem
                item={{
                  uuidmarketplaceitem: "",
                  uuidbusiness: "",
                  uuidcollaborator: "",
                  title: methods.watch("title"),
                  price: Number(methods.watch("price")),
                  brand: methods.watch("brand"),
                  status: methods.watch("status")?.value,
                  description: methods.watch("description"),
                  country: "pe",
                  department: "",
                  shippingmethod: methods.watch("shipping_method").join(","),
                  workplacedelivery: methods
                    .watch("workplace_delivery")
                    .map((w) => w.uuidworkplace)
                    .join(","),
                  paymentmethod: methods.watch("payment_method").join(","),
                  otherpaymentmethod: methods.watch("other_payment_method"),
                  validperiod: "",
                  uuidimages: "",
                  images: methods.watch("images").length
                    ? methods.watch("images").map((i) => URL.createObjectURL(i))
                    : ["/logo_adfly.svg"],
                  itemstatus: "accepted",
                  creationdate: "",
                  updatedate: "",
                  collaborator: `${collaborator?.name ?? "-"} ${
                    collaborator?.lastname ?? "-"
                  }`,
                }}
              />
            ) : (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                p={3}
              >
                <MarketplaceItemCard
                  product={{
                    uuidmarketplaceitem: "",
                    uuidbusiness: "",
                    uuidcollaborator: "",
                    title: methods.watch("title"),
                    price: Number(methods.watch("price")),
                    brand: methods.watch("brand"),
                    status: methods.watch("status.value"),
                    description: methods.watch("description"),
                    country: "pe",
                    department: "",
                    shippingmethod: methods.watch("shipping_method").join(","),
                    workplacedelivery: methods
                      .watch("workplace_delivery")
                      .join(""),
                    paymentmethod: methods.watch("payment_method").join(""),
                    otherpaymentmethod: methods.watch("other_payment_method"),
                    validperiod: "",
                    uuidimages: "",
                    images: methods
                      .watch("images")
                      .map((i) => URL.createObjectURL(i)),
                    itemstatus: "accepted",
                    creationdate: "",
                    updatedate: "",
                    collaborator: `${collaborator?.name ?? "-"} ${
                      collaborator?.lastname ?? "-"
                    }`,
                  }}
                />
              </Box>
            )}
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default MarketplaceCreation;
