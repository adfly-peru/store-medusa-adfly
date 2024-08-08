import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { Benefit } from "generated/graphql";
import { useRouter } from "next/router";

const BenefitCard = ({ product }: { product: Benefit }) => {
  const router = useRouter();
  return (
    <Card
      elevation={5}
      sx={(theme) => ({
        width: "220px",
        [theme.breakpoints.down("md")]: {
          width: 190,
        },
        borderRadius: "10px",
        marginTop: "3px",
        marginBottom: "10px",
      })}
    >
      <CardActionArea
        onClick={() => router.push(`/benefit/${product.id}`)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          padding: "0 0 10px 0",
        }}
      >
        <CardMedia
          component="img"
          height={190}
          image={
            !product.images.at(0) ? "/Logo Adfly.svg" : product.images.at(0)
          }
          alt={product.name}
          sx={(theme) => ({
            objectFit: "contain",
            [theme.breakpoints.down("md")]: {
              height: 130,
            },
          })}
        />
        <CardContent
          sx={{
            padding: "0 10px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "100%",
          }}
        >
          {/* Title */}
          <Stack sx={{ gap: "10px" }}>
            <Typography
              variant="h3"
              fontSize={13}
              fontWeight={500}
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
                height: "34px",
                fontWeight: 400,
                fontSize: "12px",
                lineHeight: "normal",
              }}
            >
              {product.name}
            </Typography>
          </Stack>
          {/* Button */}
          <Box
            sx={(theme) => ({
              fontFamily: "Open Sans, sans-serif",
              width: "144px",
              height: "26px",
              alignSelf: "center",
              fontWeight: 400,
              fontSize: 14,
              color: theme.palette.primary.main,
              border: `1px solid ${theme.palette.primary.main}`,
              textAlign: "center",
              borderRadius: "8px",
              paddingTop: "2px",
            })}
          >
            Ver detalle
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default BenefitCard;
