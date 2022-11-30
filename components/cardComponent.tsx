import { Card, Group, Text, Menu, ActionIcon, Image, SimpleGrid, Badge, Button, Container, createStyles, Flex, TextInput, Box, NumberInput, NumberInputHandlers } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconMinus, IconEye, IconFileZip, IconTrash, IconPlus } from '@tabler/icons';
import { useRef, useState } from 'react';
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
  const [value, setValue] = useState(0);
  const handlers = useRef<NumberInputHandlers>();

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

        { showBuy ?
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
          :
          <Button
            variant="light"
            color="blue"
            fullWidth
            mt="md"
            radius="md"
            onClick={() => setShowBuy(true)}
          >
            Agregar
          </Button>
        }
        
      </Card.Section>
    </Card>
  )
}
  
  export default CardComponent
  