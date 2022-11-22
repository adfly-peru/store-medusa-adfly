import { Text, Group, Image, Container, Tabs, createStyles, Autocomplete, Grid, Title, Center } from '@mantine/core';

import { IconSearch, IconShoppingCart, IconStar } from '@tabler/icons';

import { useViewportSize } from '@mantine/hooks';
import AccountLayout from '../modules/account/templates/account-layout';

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


const Home = () => {

    const { height, width } = useViewportSize();
    const { classes, theme } = useStyles();

    let tabs = ['Menú', 'Ofertas del día', 'Envío Gratis', 'Entrega en Centro de Trabajo'];
    
    let nombre = 'Colaborador'
    
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

      </AccountLayout>
    )
  }
  
  export default Home
  