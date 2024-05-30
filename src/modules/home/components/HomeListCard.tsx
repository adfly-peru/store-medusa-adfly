import { Paper, Stack, Typography } from "@mui/material";
import { HomeList, Offer } from "generated/graphql";
import ProductsSlider from "./ProductsSlider";
import { Icon } from "@iconify/react";

const HomeListCard = ({ homeList }: { homeList: Partial<HomeList> }) => {
  return (
    <Paper
      sx={(theme) => ({
        borderRadius: 0,
        padding: "30px 110px",
        display: "flex",
        flexDirection: "column",
        gap: "30px",
        [theme.breakpoints.down("lg")]: {
          padding: "30px",
          paddingBottom: "74px",
        },
        [theme.breakpoints.down("md")]: {
          padding: "10px 10px",
        },
        boxShadow: "0px 12px 20px 0px rgba(0, 0, 0, 0.1)",
        borderBottomLeftRadius: "4px",
        borderBottomRightRadius: "4px",
      })}
    >
      <Stack direction="row" alignItems="center" sx={{ gap: "20px" }}>
        <Typography variant="h2" fontSize={24} color="black" fontWeight={500}>
          {homeList.name}
        </Typography>
        <Icon
          fontSize={32}
          icon={
            homeList.section === "tienda" ? "bx:store" : "ic:outline-discount"
          }
        />
      </Stack>
      <ProductsSlider products={homeList.productsList as Offer[]} />
    </Paper>
  );
};

export default HomeListCard;
