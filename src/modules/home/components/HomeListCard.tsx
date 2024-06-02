import { Container, Paper, Stack, Typography } from "@mui/material";
import { HomeList, Offer } from "generated/graphql";
import ProductsSlider from "./ProductsSlider";
import { Icon } from "@iconify/react";

const HomeListCard = ({ homeList }: { homeList: Partial<HomeList> }) => {
  return (
    <Paper
      sx={(theme) => ({
        borderRadius: 0,
        boxShadow: "0px 12px 20px 0px rgba(0, 0, 0, 0.1)",
        borderBottomLeftRadius: "4px",
        borderBottomRightRadius: "4px",
        paddingTop: "30px",
        paddingBottom: "30px",
        [theme.breakpoints.down(949)]: {
          paddingTop: "20px",
          paddingBottom: "20px",
        },
      })}
    >
      <Container
        maxWidth={false}
        sx={(theme) => ({
          maxWidth: 1260,
          width: "100%",
          [theme.breakpoints.down(1261)]: {
            maxWidth: 1110,
          },
          [theme.breakpoints.down(1121)]: {
            maxWidth: 948,
          },
          [theme.breakpoints.down(949)]: {
            maxWidth: 802,
          },
          [theme.breakpoints.up("sm")]: {
            paddingLeft: "20px",
            paddingRight: "20px",
          },
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        })}
      >
        <Stack direction="row" alignItems="center" sx={{ gap: "20px" }}>
          <Typography
            variant="h2"
            fontSize={24}
            color="black"
            fontWeight={500}
            sx={(theme) => ({
              [theme.breakpoints.down("md")]: {
                fontSize: 19,
              },
            })}
          >
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
      </Container>
    </Paper>
  );
};

export default HomeListCard;
