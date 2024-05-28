import { useDetailedProduct } from "@modules/products/context/DetailedProductContext";
import {
  Stack,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

export function Attributes() {
  const { product, attributeSelections, handleAttributeSelection } =
    useDetailedProduct();
  return (
    <div>
      {product.offerAttributes.map((attr, index) => {
        return (
          <Stack key={index}>
            <Typography variant="body2">
              <Typography
                fontWeight={700}
                display="inline"
                component="span"
                textTransform="capitalize"
              >
                {attr.attribute.attributeName}
                {": "}
              </Typography>
              {attributeSelections[attr.attribute.attributeName] || ""}
            </Typography>
            <ToggleButtonGroup
              color="primary"
              value={attributeSelections[attr.attribute.attributeName] || ""}
              exclusive
              onChange={(_, val) =>
                handleAttributeSelection(
                  attr.attribute.attributeName,
                  val ?? ""
                )
              }
              sx={{
                marginTop: "10px",
                marginBottom: "15px",
              }}
            >
              {attr.attribute.values.map((value) => (
                <ToggleButton key={value} value={value}>
                  {value}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Stack>
        );
      })}
    </div>
  );
}
