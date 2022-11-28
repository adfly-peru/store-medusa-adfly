import { Card, Group, Text, Menu, ActionIcon, Image, SimpleGrid, Badge, Button, Container, createStyles, Flex, TextInput, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconMinus, IconEye, IconFileZip, IconTrash, IconPlus } from '@tabler/icons';
import { useState } from 'react';
import Product from '../interfaces/productInterface';

const useStyles = createStyles((theme) => ({
  card: {
    '&:hover': {
      transform: 'scale(1.01)',
      boxShadow: theme.shadows.md,
    }
  },

  info: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}))

const CardComponent = ({ product } : {product: Product}) => {
  const { classes } = useStyles();

  const [showBuy, setShowBuy] = useState(false);
  const [cant, setCant] = useState(0);

  const form = useForm({
    initialValues: {
      cant: 0,
      productName: ''
    }
  })
  
  // Calculo de precio final
  let finalPrice = product.originalPrice - (product.originalPrice * product.discount / 100);
  let ahorro = product.originalPrice - product.finalPrice;
  
  return (
    <Card
      withBorder
      p='lg'
      shadow="sm"
      radius="md"
      mt={20}
      className={classes.card}
      onMouseEnter={() => setShowBuy(true)}
      onMouseLeave={() => {setShowBuy(false); setCant(0)}}
    >
      <Card.Section withBorder inheritPadding py="xs">
        <Group position="apart">

          <Badge color="red">-{product.discount}%</Badge>
        
        </Group>
      </Card.Section>

      <Card.Section mt="sm" p={10}>
        <Image src={product.imgUrl} alt={product.imgUrl} height={200} fit="contain" withPlaceholder/>
      </Card.Section>

      <Card.Section withBorder inheritPadding mt="sm" pb="md">
        <Text mt={5}>{product.brand}</Text>
        <Text fz="xl" fw={700}>{product.name}</Text>
        <Group>
          <Text fz="sm" td="line-through">S/. {product.originalPrice}</Text>
          <Text c="red">S/. {finalPrice}</Text>
        </Group>
        <Text fz="sm" c="dimmed">(o {product.stars} estrellas)</Text>
        <Text fz="sm" c="red">Ahorro estimado S/. {ahorro}</Text>
        <Button variant="light" color="blue" fullWidth mt="md" radius="md">
          Vendido por Partner
        </Button>
        
        { showBuy && (
          <Box mx="auto" className={classes.info}>
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
              <Group position='center'>
                <ActionIcon color="blue" variant="filled" size="lg" onClick={() => setCant(1)}>
                  <IconMinus></IconMinus>
                </ActionIcon>
                <TextInput
                  value={cant} 
                  {...form.getInputProps('cant')}
                  style={{ width: 50, textAlign: 'center' }}
                />
                <ActionIcon color="blue" variant="filled" size="lg">
                  <IconPlus></IconPlus>
                </ActionIcon>

              </Group>
    
              <Group position="center" mt="md">
                <Button type="submit">Agregar al carrito</Button>
              </Group>
            </form>
          </Box>
          )
        }
      </Card.Section>
    </Card>
  )
}
  
  export default CardComponent
  