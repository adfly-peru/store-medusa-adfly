import { useAccount } from "@context/account-context";
import { ArrowBack, CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import {
  Paper,
  List,
  Divider,
  ListItemButton,
  ListItemIcon,
  Typography,
  Stack,
  InputAdornment,
  Autocomplete,
  Box,
  Checkbox,
  Chip,
  TextField,
  InputLabel,
  FormControl,
  FormHelperText,
  Button,
} from "@mui/material";
import { useRouter } from "next/router";
import DropImages from "./DropImages";
import TextFieldInput from "@modules/components/TextFieldInput";
import SelectFieldInput from "@modules/components/SelectFieldInput";
import ubigeoPeru from "ubigeo-peru";
import CheckboxesInput from "@modules/components/CheckboxesInput";
import { Controller, useFieldArray, UseFormReturn } from "react-hook-form";
import { MarketPlaceItemForm } from "../Creation";
import { useCategories } from "@context/categories-context";
import LoadingButton from "@modules/components/LoadingButton";
import { useSession } from "next-auth/react";
import { createMarketplace } from "api/marketplace";
import { useDialog } from "@context/DialogContext";
import { AxiosError } from "axios";

const CreationBar = ({
  methods,
}: {
  methods: UseFormReturn<MarketPlaceItemForm, any, undefined>;
}) => {
  const { data: session } = useSession();
  const { openDialog, closeDialog } = useDialog();
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = methods;

  const { fields: departmentFields, remove: removeDepartment } = useFieldArray({
    control,
    name: "department",
  });

  const { fields: wDeliveryFields, remove: removeWDelivery } = useFieldArray({
    control,
    name: "workplace_delivery",
  });

  const { collaborator } = useAccount();
  const router = useRouter();
  const { marketplaceworkplaces } = useCategories();

  const handleCreate = async (data: MarketPlaceItemForm) => {
    if (!session?.user?.uuidbusiness || !session.user.accessToken) return;
    try {
      await createMarketplace(
        session.user.accessToken,
        session.user.uuidbusiness,
        data
      );
      openDialog({
        title: "¡Oferta creada con éxito!",
        content: (
          <Stack width="100%" alignItems="center" justifyContent="center">
            <Typography
              variant="caption"
              fontSize={16}
              lineHeight="24px"
              textAlign="center"
            >
              La oferta se ha aceptado correctamente. Podrá visualizarlo dentro
              de Mi Marketplace
            </Typography>
          </Stack>
        ),
        actions: [
          <Button
            key="close-action"
            onClick={() => {
              closeDialog();
              router.push("/account/marketplace/admin");
            }}
            size="small"
            variant="contained"
          >
            Continuar
          </Button>,
        ],
        centeredTitle: true,
        closable: false,
      });
    } catch (error: any) {
      const errorMessage =
        (error as AxiosError<any, any>).response?.data?.error ||
        (error as AxiosError<any, any>).response?.data ||
        error?.message ||
        "Error desconocido";

      openDialog({
        title: "¡Error al create una oferta!",
        content: (
          <Typography
            variant="body2"
            fontSize={16}
            lineHeight="24px"
            textAlign="center"
          >
            {typeof errorMessage === "string"
              ? errorMessage
              : JSON.stringify(errorMessage)}
          </Typography>
        ),
        actions: [
          <Button
            key="close-action"
            onClick={() => {
              closeDialog();
            }}
            size="small"
            variant="contained"
          >
            Volver
          </Button>,
        ],
        centeredTitle: true,
        closable: false,
      });
    }
  };

  return (
    <Paper
      elevation={3}
      sx={(theme) => ({
        padding: "13px 0",
        width: 380,
        [theme.breakpoints.down("lg")]: {
          width: 320,
        },
        backgroundColor: "#F2F2F2",
      })}
    >
      <List
        sx={{ width: "100%" }}
        subheader={
          <ListItemButton
            sx={{
              backgroundColor: "inherit",
            }}
            onClick={() => router.back()}
          >
            <ListItemIcon
              sx={{
                marginRight: 1,
              }}
            >
              <ArrowBack />
            </ListItemIcon>
            <Typography
              sx={{
                fontSize: 20,
                fontWeight: 600,
                lineHeight: "23px",
                color: "black",
              }}
            >
              Artículo en venta
              <br />
              <Typography
                component="span"
                fontSize={12}
                lineHeight="17px"
                fontWeight={400}
              >
                Market Place
              </Typography>
            </Typography>
          </ListItemButton>
        }
      >
        <Divider
          sx={(theme) => ({
            border: `0.5px solid ${theme.palette.grey[200]}`,
          })}
        />
        <Stack p="10px 20px" gap={3}>
          <Typography
            sx={{
              fontSize: 20,
              fontWeight: 600,
              lineHeight: "23px",
              color: "black",
            }}
          >
            {collaborator?.name ?? "--"} {collaborator?.lastname ?? "--"}
            <br />
            <Typography
              component="span"
              fontSize={12}
              lineHeight="17px"
              fontWeight={400}
            >
              Publicación market place
            </Typography>
          </Typography>
          <DropImages
            onImageUpload={(imgs) => methods.setValue("images", imgs)}
          />
          <TextFieldInput
            label="Título"
            required
            description="Título del producto"
            control={control}
            name="title"
            fieldError={errors.title}
          />
          <TextFieldInput
            label="Precio"
            required
            type="number"
            description="Indica el precio del producto en la moneda local"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">S/.</InputAdornment>
              ),
            }}
            control={control}
            name="price"
            fieldError={errors.price}
          />
          <TextFieldInput
            label="Marca"
            description="Escribe la marca del producto"
            control={control}
            name="brand"
            fieldError={errors.brand}
          />
          <SelectFieldInput
            label="Estado"
            required
            description="Especifica si el producto es nuevo o usado"
            options={[
              { label: "Nuevo", value: "new" },
              { label: "Usado", value: "used" },
            ]}
            getOptionLabel={(option) =>
              typeof option === "string" ? option : option.label
            }
            isOptionEqualToValue={(option, value) =>
              option.value === value?.value
            }
            control={control}
            name="status"
            fieldError={errors.status}
          />
          <TextFieldInput
            label="Descripción"
            description="Proporciona información adicional o detalles relevantes sobre el"
            multiline
            rows={4}
            control={control}
            name="description"
            fieldError={errors.description}
          />
          <Box sx={{}}>
            <Divider
              sx={(theme) => ({
                border: `0.5px solid ${theme.palette.grey[200]}`,
                mb: 1,
              })}
            />
            <FormControl
              fullWidth
              required
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <InputLabel
                htmlFor="department"
                sx={{
                  color: "black",
                  fontWeight: 600,
                  transform: "none",
                  fontSize: "14px !important",
                  lineHeight: "24px !important",
                  position: "unset",
                }}
              >
                Alcance
              </InputLabel>
              <FormHelperText sx={{ m: 0 }}>
                Especifica hasta donde es la cobertura que cubre el producto
              </FormHelperText>
              <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                options={ubigeoPeru.reniec.filter(
                  (v) => v.distrito === "00" && v.provincia === "00"
                )}
                disableCloseOnSelect
                getOptionLabel={(option) =>
                  typeof option === "string" ? option : option.nombre || ""
                }
                isOptionEqualToValue={(option, value) =>
                  option.departamento === value.departamento
                }
                value={departmentFields}
                onChange={(_, v) => setValue("department", v)}
                renderOption={(props, option, { selected }) => {
                  const { ...optionProps } = props;
                  return (
                    <li {...optionProps} key={option.departamento}>
                      <Checkbox
                        icon={<CheckBoxOutlineBlank fontSize="small" />}
                        checkedIcon={<CheckBox fontSize="small" />}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.nombre}
                    </li>
                  );
                }}
                renderTags={() => null}
                disableClearable
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    label=""
                    placeholder="Departamentos"
                    sx={{ mb: 1 }}
                  />
                )}
              />
              <Box mb={1}>
                {departmentFields.map((dep, id) => (
                  <Chip
                    sx={{ margin: "3px" }}
                    key={id}
                    label={dep.nombre}
                    variant="outlined"
                    onDelete={() => removeDepartment(id)}
                  />
                ))}
              </Box>
            </FormControl>
            <Divider
              sx={(theme) => ({
                border: `0.5px solid ${theme.palette.grey[200]}`,
              })}
            />
          </Box>
          <Stack>
            <CheckboxesInput
              control={control}
              name="shipping_method"
              label="Método de entrega"
              required
              description="Escoge como se podrá recibir el producto."
              options={[
                {
                  value: "door_delivery",
                  label: "Entrega en la puerta",
                  description:
                    "El producto se entrega en la puerta del comprado",
                },
                {
                  value: "door_pick_up",
                  label: "Recoger en la puerta",
                  description: "El comprador recoge el producto en tu puerta",
                },
                {
                  value: "public_place_delivery",
                  label: "Entrega lugar público",
                  description: "Encuentro en un lugar público",
                },
                {
                  value: "workplace_delivery",
                  label: "Encuentro lugar de trabajo",
                  description: "Encuentro en un lugar de trabajo",
                },
              ]}
            />
            {watch("shipping_method").includes("workplace_delivery") && (
              <div>
                <Controller
                  name="workplace_delivery"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      multiple
                      id="checkboxes-tags-demo"
                      value={field.value}
                      onChange={(_, v) => field.onChange(v)}
                      options={marketplaceworkplaces}
                      disableCloseOnSelect
                      getOptionLabel={(option) =>
                        typeof option === "string" ? option : option.name || ""
                      }
                      isOptionEqualToValue={(option, value) =>
                        option.uuidworkplace === value.uuidworkplace
                      }
                      renderOption={(props, option, { selected }) => {
                        const { ...optionProps } = props;
                        return (
                          <li key={option.uuidworkplace} {...optionProps}>
                            <Checkbox
                              icon={<CheckBoxOutlineBlank fontSize="small" />}
                              checkedIcon={<CheckBox fontSize="small" />}
                              style={{ marginRight: 8 }}
                              checked={selected}
                            />
                            {option.name}
                          </li>
                        );
                      }}
                      renderTags={() => null}
                      disableClearable
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          label="Escoger sede"
                          placeholder="Escoger sede"
                          sx={{ mb: 1 }}
                        />
                      )}
                    />
                  )}
                />
                <Box mb={1}>
                  {wDeliveryFields.map((dep, id) => (
                    <Chip
                      sx={{ margin: "3px" }}
                      key={dep.uuidworkplace}
                      label={dep.name}
                      variant="outlined"
                      onDelete={() => removeWDelivery(id)}
                    />
                  ))}
                </Box>
              </div>
            )}
            <Divider
              sx={(theme) => ({
                border: `0.5px solid ${theme.palette.grey[200]}`,
              })}
            />
          </Stack>
          <Stack>
            <CheckboxesInput
              label="Método de entrega"
              control={control}
              name="payment_method"
              required
              description="Escoge como se podrá recibir el producto."
              options={[
                {
                  value: "digital_wallet",
                  label: "Billetera Digital",
                  description:
                    "Métodos de pago como Yape, Plin, Agora PAY, Agora.",
                },
                {
                  value: "cash",
                  label: "Efectivo",
                  description: "Pago en efectivo al encontrarse",
                },
                {
                  value: "credit_card",
                  label: "Transferencia/Deposito",
                  description: "Aceptas el pago por deposito bancario",
                },
                {
                  value: "other",
                  label: "Otros",
                  description: "Agrega otro método de pago",
                },
              ]}
            />
            {watch("payment_method").includes("other") && (
              <TextFieldInput
                label=""
                placeholder="Otro método de pago"
                control={control}
                name="other_payment_method"
              />
            )}
            <Divider
              sx={(theme) => ({
                mt: 1,
                border: `0.5px solid ${theme.palette.grey[200]}`,
              })}
            />
          </Stack>
          <SelectFieldInput
            label="Tiempo de vigencia"
            required
            description="Define el período durante el cual el producto estará activo o disponible."
            options={[
              { label: "7 días", value: "7" },
              { label: "15 días", value: "15" },
              { label: "30 días", value: "30" },
            ]}
            getOptionLabel={(option) =>
              typeof option === "string" ? option : option.label
            }
            isOptionEqualToValue={(option, value) =>
              option.value === value?.value
            }
            control={control}
            name="valid_period"
          />
        </Stack>
        <Divider
          sx={(theme) => ({
            my: 2,
            border: `0.5px solid ${theme.palette.grey[200]}`,
          })}
        />
        <Stack justifyContent="center" alignItems="center">
          <LoadingButton
            variant="outlined"
            size="small"
            asyncFunction={handleSubmit(handleCreate)}
          >
            Crear
          </LoadingButton>
        </Stack>
      </List>
    </Paper>
  );
};

export default CreationBar;
