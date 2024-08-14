import ImageSlider from "@modules/components/ImageSlider";
import TextFieldInput from "@modules/components/TextFieldInput";
import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import { MarketplaceItem } from "generated/graphql";

const MarketplaceItemResume = ({ item }: { item: MarketplaceItem }) => {
  return (
    <Grid container rowSpacing={1} columnSpacing={2}>
      <Grid item xs={12}>
        <Stack direction="row" gap={2}>
          <Box width={240} height={285}>
            <ImageSlider
              images={
                item.images?.length ?? 0 > 0
                  ? item.images ?? []
                  : ["/example/image 11.png", "/example/image 11.png"]
              }
              maxWidth={235}
            />
          </Box>
          <Box flex={1}>
            <TextFieldInput
              disabled
              label="Nombre de la oferta"
              value={item.title}
              multiline
              rows={3}
            />
          </Box>
        </Stack>
        <Divider />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextFieldInput
          disabled
          label="Estado"
          value={item.status === "new" ? "Nuevo" : "Usado"}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextFieldInput disabled label="Precio" value={`S/. ${item.price}`} />
      </Grid>
      <Grid item xs={12}>
        <TextFieldInput
          disabled
          label="Descripción"
          value={item.description}
          multiline
          rows={4}
        />
        <Divider />
      </Grid>
    </Grid>
  );
};

export default MarketplaceItemResume;
