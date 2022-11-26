import { Text, Group, Image, Container, Tabs, createStyles, Autocomplete, Grid, Title, Center } from '@mantine/core';

import { IconSearch, IconShoppingCart, IconStar } from '@tabler/icons';

import { useViewportSize } from '@mantine/hooks';
import AccountLayout from '../modules/account/templates/account-layout';

import CardComponent from '../components/cardComponent';
import Product from '../interfaces/productInterface';

const useStyles = createStyles((theme) => ({
    header: {
        paddingTop: theme.spacing.sm,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        borderBottom: `1px solid ${
          theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[2]
        }`,
        marginBottom: 50,
      },

    mainSection: {
        paddingBottom: theme.spacing.sm,
      },
    
    search: {
        [theme.fn.smallerThan('xs')]: {
            display: 'none',
        },
    },

    tabs: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none.'
        },
    },

    tabsList: {
        borderBottom: '0 !important',
    },

    tab: {
        fontWeight: 500,
        height: 38,
        backgroundColor: 'transparent',
    
        '&:hover': {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
        },
    
        '&[data-active]': {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
          borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2],
        },
      },

}));

const productsList: Product[] = [
  {
    discount: 50,
    imgUrl: '',
    brand: 'Marca1',
    name: 'Producto1',
    originalPrice: 30,
    finalPrice: 15,
    starts: 5,
  },
  {
    discount: 30,
    imgUrl: '',
    brand: 'Marca2',
    name: 'Producto2',
    originalPrice: 40,
    finalPrice: 15,
    starts: 5,
  },
  {
    discount: 60,
    imgUrl: '',
    brand: 'Marca3',
    name: 'Producto3',
    originalPrice: 35,
    finalPrice: 15,
    starts: 5,
  },
  {
    discount: 20,
    imgUrl: '',
    brand: 'Marca4',
    name: 'Producto4',
    originalPrice: 25,
    finalPrice: 15,
    starts: 5,
  },
  {
    discount: 30,
    imgUrl: '',
    brand: 'Marca5',
    name: 'Producto5',
    originalPrice: 30,
    finalPrice: 15,
    starts: 5,
  },
  {
    discount: 60,
    imgUrl: '',
    brand: 'Marca6',
    name: 'Producto6',
    originalPrice: 80,
    finalPrice: 15,
    starts: 5,
  }
];

const Home = () => {

    const { height, width } = useViewportSize();
    const { classes, theme } = useStyles();

    let tabs = ['Menú', 'Ofertas del día', 'Envío Gratis', 'Entrega en Centro de Trabajo'];
    
    let nombre = 'Colaborador'

    let cardProducts = productsList.map( ( prod ): any =>
      <Grid.Col xs={4}>
        <CardComponent product={prod}/>
      </Grid.Col>
    )
    
    const items = tabs.map((tab) => (
        <Tabs.Tab value={tab} key={tab}>
          {tab}
        </Tabs.Tab>
      ));

    return (
      <AccountLayout>
      <header className={classes.header}>
        <Container className={classes.mainSection}>
            <Group position='apart'>
            <Image
                radius="md"
                height={50}
                width='inherit'
                fit="contain"
                src="https://www.cbvj.org.br/index/wp-content/uploads/2017/10/default-logo.png"
                alt="Random unsplash image"
                sx={({ padding: 10 })}
            />

            <Text>Menú</Text>

            <Autocomplete
                className={classes.search}
                placeholder="Search"
                icon={<IconSearch size={16} stroke={1.5} />}
                data={['Tienda1', 'Tienda2', 'Producto1', 'Producto2']}
            />

            <Text>Hola, {nombre}</Text>

            <IconShoppingCart
                size={30}
                stroke={1.5}
            />

            </Group>
        </Container>
        <Container>
            <Tabs
            defaultValue="Home"
            variant="outline"
            classNames={{
                root: classes.tabs,
                tabsList: classes.tabsList,
                tab: classes.tab,
            }}
            >
            <Tabs.List>{items}</Tabs.List>
            </Tabs>
        </Container>
      </header>

      <Center>
        <Title>
          Bienvenido {nombre}
        </Title>  
      </Center>

      <Container my='md'>

        <Grid mt={20}>

              {cardProducts}

        </Grid>
      
      </Container>


      </AccountLayout>
    )
  }
  
  export default Home
  