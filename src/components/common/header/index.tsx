import { Badge, Button, Center, Container, Group, Header, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import CartDropdown from "../cart-dropdown";


export function LayoutHeader() {

  return (
    <>
        <Header height={60} p="xs">
          <Container size="xl" px="xs">
            <Group position="apart">
              <Link to={'/'}>
                <Badge size="xl">Adfly</Badge>
              </Link>
              <CartDropdown />
            </Group>
          </Container>
        </Header>
    </>
  )
}