import { createStyles, Text, Card, Group, CardSection, Badge, Image, Grid, ActionIcon, NumberInput, Button, NumberInputHandlers } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRef, useState } from 'react';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },
}));

interface ProductDetails {
  discount: number;
  imgUrl: string[],
  brand: string,
  name: string,
  originalPrice: number,
  finalPrice: number,
  stars: number,
  stock: number,
  expirationDate: string,
  details: string,
}

export function CardProductDetails(product: ProductDetails) {
  const { classes, theme } = useStyles();

  // Calculo de precio final
  let finalPrice = product.originalPrice - (product.originalPrice * product.discount / 100);
  let ahorro = product.originalPrice - product.finalPrice;



  const [showBuy, setShowBuy] = useState(false);
  const [value, setValue] = useState(0);
  const handlers = useRef<NumberInputHandlers>();

  const form = useForm({
    initialValues: {
      cant: 0,
      productName: ''
    }
  })


  return (
    <Card withBorder p="xl" radius="md" className={classes.card}>

      <CardSection>
        <Group position="apart">
          <Badge m={5} color="red">-{product.discount}%</Badge>
        </Group>
      </CardSection>
      <CardSection>
        <Grid>
          <Grid.Col xs={6}>
            <Image src={product.imgUrl[0]} alt={product.imgUrl[0]} height={200} fit="contain" withPlaceholder/>
            <Grid>
              <Grid.Col xs={3}>
                <Image src={product.imgUrl[0]} alt={product.imgUrl[0]} height={100} fit="contain" withPlaceholder/>
              </Grid.Col>
              <Grid.Col xs={3}>
                <Image src={product.imgUrl[0]} alt={product.imgUrl[0]} height={100} fit="contain" withPlaceholder/>
              </Grid.Col>
              <Grid.Col xs={3}>
                <Image src={product.imgUrl[0]} alt={product.imgUrl[0]} height={100} fit="contain" withPlaceholder/>
              </Grid.Col>
            </Grid>

          </Grid.Col>

          <Grid.Col xs={6}>
          <Text mt={5}>{product.brand}</Text>
        <Text fz="xl" fw={700}>{product.name}</Text>
        <Group>
          <Text fz="sm" td="line-through">S/. {product.originalPrice}</Text>
          <Text c="red">S/. {finalPrice}</Text>
        </Group>
        <Text fz="sm">(o {product.stars} estrellas)</Text>
        <Text fz="sm" c="red">Ahorro estimado S/. {ahorro}</Text>
        <Text fz="sm">Vendido por Partner</Text>
        <Text fz="sm">Stock: {product.stock} Unidad(es)</Text>
        <Text fz="sm">Fecha de Vencimiento: {product.expirationDate}</Text>
        


          <Group
            spacing={5}
            position="center"
            style={{ marginTop: 15 }}
          >
          <ActionIcon size={36} variant="default" onClick={() => handlers.current?.decrement()}>
            –
          </ActionIcon>
    
          <NumberInput
            hideControls
            value={value}
            onChange={(val: number) => setValue(val)}
            handlersRef={handlers}
            max={10}
            min={0}
            step={1}
            styles={{ input: { width: 70, textAlign: 'center' } }}
          />
    
          <ActionIcon size={36} variant="default" onClick={() => handlers.current?.increment()}>
            +
          </ActionIcon>
        </Group>
          <Button
            variant="light"
            color="blue"
            fullWidth
            mt="md"
            radius="md"
            onClick={() => {setShowBuy(true); setValue(1)}}
          >
            Agregar
          </Button>
        
          </Grid.Col>
        </Grid>
      </CardSection>
      
      <CardSection>
        <Text>Detalle del Producto</Text>
        <Text>{product.details}</Text>

      </CardSection>

    </Card>
  );
}