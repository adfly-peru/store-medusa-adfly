import React, { useState } from 'react';

import {
  Text,
  Button,
  Group,
  Box,
  createStyles,
  Card
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme) => ({

  subtitle: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 250,
    fontSize: 14
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
    fontSize: 20
  },

  steps: {
    marginTop: 20
  }

}));

export function Demo() {
  
  const { classes, theme } = useStyles();

  const [next, setNext] = useState(false);
  const [done, setDone] = useState(false);

  const form = useForm({

    initialValues: {
      contact: '',
      address: '',
      delivery: {
        service: '',
        amount: ''
      }
    },

  });
  
  const delivery = {amount: '0.00', coin: 'EUR', service: 'Amaru Express'};
  
  return (
    <Box sx={{ maxWidth: 500, height: '100%'}} mx="auto">
      
      <form
        onSubmit={form.onSubmit((values) => {
          console.log(values);
          setDone(done => !done)
        })}>

        <Text
          style={{ marginTop: 20 }}
          className={classes.title}
        >Steps</Text>

        <Card withBorder className={classes.steps}>
          <Group position="apart">
            <Group>
              <Text className={classes.subtitle}>Contact</Text>
              <Text className={classes.subtitle}>Elizabeth Williams</Text>
            </Group>
            
            <Text className={classes.subtitle}>Edit</Text>
          </Group>  
        </Card>


        <Card withBorder className={classes.steps}>
          <Group position="apart">
            <Group>
              <Text className={classes.subtitle}>Address</Text>
              <Text className={classes.subtitle}>15329 Huston 21st</Text>
            </Group>
            
            <Text className={classes.subtitle}>Edit</Text>
          </Group>  
        </Card>

        {/* <TextInput
          label="Contact"
          placeholder="Elizabeth Williams"
          {...form.getInputProps('contact')}
        />

        <TextInput
          label="Address"
          placeholder="15329 Huston 21st"
          {...form.getInputProps('address')}
        /> */}

        {!next ? <></> :
          <Card withBorder  className={classes.steps}>
            <Group position="apart">
              <Group>
                <Text className={classes.subtitle}>Delivery</Text>
                <Text className={classes.subtitle}>{delivery.service}</Text>
              </Group>
              
              <Text className={classes.subtitle}>{delivery.amount} {delivery.coin}</Text>
            </Group>  
          </Card>
        }

        
        {!next ?
          <>
            <Text
              style={{ marginTop: 20 }}
              className={classes.title}
            >Delivery</Text>

            <Card withBorder>
              <Group position="apart">
                <Text className={classes.subtitle}>{delivery.service}</Text>
                
                <Text className={classes.subtitle}>{delivery.amount} {delivery.coin}</Text>
              </Group>  
            </Card>
            <Group position="right" mt="md">
              <Button onClick={() => {
                setNext(!next)
              }}>Next</Button>
            </Group>
          </>
        :
          <>
            <Text
            style={{ marginTop: 20 }}
            className={classes.title}
            >Test Payment</Text>
            
            <Group position="left" mt="md">
              <Link to={'/order_summary'}>
              <Button type="submit">Pay</Button>
              </Link>
            </Group>
          </>
        }


      </form>
    </Box>
  );
}
