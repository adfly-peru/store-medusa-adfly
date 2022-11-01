import { useState } from 'react';

import {
  Card,
  Image,
  Text,
  Group,
  createStyles,
  Center
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
    fontSize: 17
  },

  subtitle: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 250,
    fontSize: 14
  },

  imageSection: {
    margin: 10,
    maxWidth: 300,
    alignItems: 'center',
    justifyContent: 'center'
  },

  label: {
    marginBottom: theme.spacing.xs,
    lineHeight: 1,
    fontWeight: 700,
    fontSize: theme.fontSizes.xs,
    letterSpacing: -0.25,
    textTransform: 'uppercase',
  },

  section: {
    padding: theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

const mockdata = [
  { label: 'Size', info: 'fork' },
  { label: 'Price', info: '50.00 USD' },
  { label: 'Quantity', info: '1' }
];

export function FeaturesCard() {

  const [done, setDone] = useState(false);

  const { classes } = useStyles();
  
  const features = mockdata.map((feature) => (
    <Center key={feature.label}>
      <Text size="xs">{feature.label}: {feature.info}</Text>
    </Center>
  ));

  return (
    <Card withBorder radius="md" className={classes.card}>

      <Group position="apart" mt="md">
        <Text
          className={classes.title}
        >Order Summary</Text>
        <Text className={ classes.subtitle }>1 item</Text>
      </Group>

      <Group position="left">
        <Card.Section className={classes.imageSection}  style={{ display: 'flex' }}>
            <Image src="https://i.imgur.com/ZL52Q2D.png" alt="Tesla Model S" />

            <Group>
            <Text size="sm" color="dimmed" className={classes.title}>
            Fork
            </Text>

            <Group spacing={1} mb={-8} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            {features}
            </Group>
            </Group>
        </Card.Section>
      </Group>
      

      <Card.Section className={classes.section}>
        <Group position='apart' mb={10}>
            <Text sx={{ lineHeight: 1 }}>
              Subtotal (incl. taxes)
            </Text>
            <Text sx={{ lineHeight: 1 }}>
              50.00 USD
            </Text>
        </Group>
        <Group position='apart' mb={10}>
            <Text sx={{ lineHeight: 1 }}>
              Shipping
            </Text>
            <Text sx={{ lineHeight: 1 }}>
              0.00 USD
            </Text>
        </Group>
        <Group position='apart' mb={10}>
            <Text size="md" weight={700} sx={{ lineHeight: 1 }}>
              Total
            </Text>
            <Text size="md" weight={700} sx={{ lineHeight: 1 }}>
              52.50 USD
            </Text>

        </Group>
      </Card.Section>
    </Card>
  );
}