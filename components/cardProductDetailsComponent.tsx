import { createStyles, Text, Card, Group, CardSection, Badge, Image, Grid, ActionIcon, NumberInput, Button, NumberInputHandlers, Stack, SimpleGrid, Center, Flex, Title, Divider, Space, Breadcrumbs, Anchor } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRef, useState } from 'react';
import Product from '../interfaces/productInterface';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },
}));


export function CardProductDetails({ product } : {product: Product}) {
  const { classes, theme } = useStyles();
  const [ imgIdx, setIdx ] = useState(0);

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
    <Card withBorder py="xl" px="xl" radius="md" className={classes.card}>
      <CardSection inheritPadding withBorder py="xs">
        <Breadcrumbs separator="→">
          <Anchor fw={500} color="dark" href={'/home'}>
            Inicio
          </Anchor>
          <Anchor fw={500} color="dark" href={'/home'}>
            {product.brand}
          </Anchor>
          <Text>{product.name}</Text>
        </Breadcrumbs>
      </CardSection>
      
      <CardSection inheritPadding py="xl">
        <Group align="start" position="apart" grow>
          <Stack spacing="xs">
            <div style={{ width: 70 }}>
              <Badge size="lg" color="red" radius="xs" variant="filled" fullWidth>-{product.discount}%</Badge>
            </div>
            <Space h="lg"/>
            <Image src={product.imgUrl[imgIdx]} alt={product.imgUrl[imgIdx]} height={200} fit="contain" withPlaceholder/>
            <Flex>
              {
                product.imgUrl.map( ( img, idx ) =>
                  <Image onClick={()=>setIdx(idx)} key={idx} src={img} alt={img} height={100} fit="contain" withPlaceholder/>
                )
              }
            </Flex>
          </Stack>
          <Stack spacing="xs">
            <Title order={1}>{product.name}</Title>
            <Text fw={500}>Marca: {product.brand}</Text>
            <Group>
              <Text c="dimmed" fw={100} fz="sm" td="line-through">S/. {product.originalPrice}</Text>
              <Text c="red" fw={700}>S/. {finalPrice}</Text>
            </Group>
            <Text fw={450}>o {product.stars} estrellas ⭐</Text>
            <Text fz="xs">(Ahorro estimado S/. {ahorro})</Text>
            <Divider my="sm" />
            <Text>Vendido por <Text span fw={500} inherit>Partner</Text></Text>
            <Divider my="sm" />
            <Text fz="xs">Stock: {product.details.stock} Unidad(es)</Text>
            <Text fz="xs">Fecha de Vencimiento: {product.details.expirationDate}</Text>
            <Group
              spacing={5}
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
              <Space />
              <Text fz="xs" c="dimmed">Máximo: x unidades este mes.</Text>
            </Group>
            <Button
              variant="light"
              color="blue"
              fullWidth
              mt="md"
              radius="md"
              onClick={() => {setShowBuy(true);}}
            >
              Agregar
            </Button>
          </Stack>
        </Group>
      </CardSection>
      
      <CardSection inheritPadding withBorder py="xs">
        <Text>Detalles del Producto</Text>
        <Text>{product.details.details}</Text>
      </CardSection>
    </Card>
  );
}