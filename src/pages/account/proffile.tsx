import { Text, Group, Image, Container, Tabs, createStyles, Autocomplete, Grid, Avatar, Stack, Badge, Title, Header } from '@mantine/core';

import { IconSearch, IconShoppingCart, IconStar } from '@tabler/icons';

import { useViewportSize } from '@mantine/hooks';
import DatosPersonalesComponent from '../../components/datosPersonalesComponent';
import SeguridadComponent from '../../components/seguridadComponent';
import AccountLayout from '../../modules/account/templates/account-layout';
import HomeHeader from '../../modules/home/components/header';
import AuthLayout from '../../modules/account/templates/authentication-layout';

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


const Proffile = () => {

    /* Lógica provisional */
    let step1Completed = false;

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
      <AuthLayout>
      <Header height={120} p="xs"><HomeHeader/></Header>

      <Grid>
            <Grid.Col
                span={3}
                sx={({ display: 'flex', paddingLeft: 30 })}
            >
                <Avatar radius='xl' size='xl'/>
                <Stack spacing="xs" align="center" justify="flex-start">
                    <Badge size='md'>
                        <IconStar size={15} /> 210 Estrellas
                    </Badge>
                    <Title order={3}>Nombre</Title>
                    <Text>Empresa (*)</Text>
                </Stack>


            </Grid.Col>

            <Grid.Col
                span={9}
                sx={({ height: height, display: "flex", justifyContent: "center", alignItems: "flex-start" })}
            >
              {step1Completed ? 
                <SeguridadComponent /> : 
                <DatosPersonalesComponent />
              }


            </Grid.Col>
        </Grid>

      </AuthLayout>
    )
  }
  
  export default Proffile
  