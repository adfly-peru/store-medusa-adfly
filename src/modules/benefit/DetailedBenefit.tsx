import * as amplitude from "@amplitude/analytics-browser";
import { useBenefitQuery } from "generated/graphql";
import React from "react";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import Loader from "@modules/components/LoadingScreen/Loader";
import { BenefitBreadcumbsSection } from "./components/BreadcumbsSection";
import { BenefitImages } from "./components/ImageSection";
import { BenefitDetails } from "./components/DetailsSection";

const DetailedBenefit = () => {
  const router = useRouter();
  const id = router.query.benefit as string;
  const { data, loading } = useBenefitQuery({
    variables: {
      id,
    },
  });

  const product = data?.benefit;

  if (loading) {
    return <Loader />;
  }

  if (!product) {
    return <div>Benefit not found</div>;
  }

  return (
    <Box
      sx={(theme) => ({
        paddingLeft: "50px",
        paddingRight: "50px",
        [theme.breakpoints.down(481)]: {
          paddingLeft: 0,
          paddingRight: 0,
        },
        width: "100%",
      })}
    >
      <Box
        sx={{
          marginTop: "40px",
          marginLeft: "10px",
          marginRight: "10px",
          marginBottom: "40px",
        }}
      >
        <BenefitBreadcumbsSection product={product} />
        <Stack
          sx={(theme) => ({
            flexDirection: "row",
            marginTop: "25px",
            gap: "40px",
            [theme.breakpoints.down("md")]: {
              flexDirection: "column",
              alignItems: "center",
            },
          })}
        >
          <Typography
            variant="h1"
            color="black"
            fontSize={20}
            sx={(theme) => ({
              display: "none",
              [theme.breakpoints.down("md")]: {
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxHeight: "3em",
              },
            })}
          >
            {product.name}
          </Typography>
          <BenefitImages product={product} />
          <Stack spacing={2} width="100%">
            <Typography
              variant="h1"
              color="black"
              fontSize={20}
              sx={(theme) => ({
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxHeight: "3em",
                [theme.breakpoints.down("md")]: {
                  display: "none",
                },
              })}
            >
              {product.name}
            </Typography>
            <Divider />
            <Typography fontWeight={600}>Descripción</Typography>
            <Card sx={{ height: 250, overflow: "auto", flex: 1 }}>
              <CardContent>{product.description}</CardContent>
            </Card>
            <Divider />
            <Button variant="contained" fullWidth size="small">
              ¡Lo quiero!
            </Button>
          </Stack>
        </Stack>
        <BenefitDetails product={product} />
      </Box>
    </Box>
  );
};

export default React.memo(DetailedBenefit);
