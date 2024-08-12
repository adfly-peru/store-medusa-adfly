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
              onChange={(_, val) => {
                if (!val) return;
                const validVariants = product.variant.filter((variant) =>
                  variant.attributes.every((a) =>
                    a.attributeName === attr.attribute.attributeName
                      ? a.value === val
                      : attributeSelections[a.attributeName] === a.value
                  )
                );
                if (validVariants.length)
                  handleAttributeSelection(
                    attr.attribute.attributeName,
                    val ?? ""
                  );
                else {
                  product.variant
                    .find((v) =>
                      v.attributes.some(
                        (a) =>
                          a.attributeName === attr.attribute.attributeName &&
                          a.value === val
                      )
                    )
                    ?.attributes.forEach((a) =>
                      handleAttributeSelection(a.attributeName, a.value ?? "")
                    );
                }
              }}
              sx={{
                marginTop: "10px",
                marginBottom: "15px",
              }}
            >
              {attr.attribute.values.map((value) => (
                <ToggleButton
                  key={value}
                  value={value}
                  disabled={
                    !product.variant.filter((v) =>
                      v.attributes.some(
                        (a) =>
                          a.attributeName === attr.attributeName &&
                          a.value === value
                      )
                    ).length
                  }
                >
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
