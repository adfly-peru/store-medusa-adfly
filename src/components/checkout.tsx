import { Grid } from '@mantine/core'
import { Demo } from './info';
import { FeaturesCard } from './resume'

export function Checkout() {
  return (
    <>  
      <Grid>
        <Grid.Col xs={7}>
          <Demo></Demo>
        </Grid.Col>

        <Grid.Col xs={5}>
          <FeaturesCard></FeaturesCard>
        </Grid.Col>
      </Grid>
    </>
  )
}