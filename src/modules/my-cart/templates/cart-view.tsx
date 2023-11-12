import { Cart } from "@interfaces/cart";
import {
  Stack,
  Divider,
  ScrollArea,
  Title,
  Table,
  MediaQuery,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import DetailedProductCartView from "@modules/my-cart/components/product-cart-view";
import ProductCartRow from "../components/product-cart-row";

const CartView = ({ cart }: { cart: Cart }) => {
  return (
    <Stack align="flex-start">
      <MediaQuery
        smallerThan="md"
        styles={{
          display: "none",
        }}
      >
        <Table withBorder>
          <thead>
            <tr>
              <th
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: "black",
                  paddingLeft: 15,
                }}
              >
                Detalle
              </th>
              <th
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: 700,
                  color: "black",
                }}
              >
                Precio
              </th>
              <th
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: 700,
                  color: "black",
                }}
              >
                Cantidad
              </th>
              <th
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: 700,
                  color: "black",
                }}
              >
                Total
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.suborders.map((suborder, id) => (
              <>
                {suborder.items.map((item) => (
                  <ProductCartRow
                    key={item.uuidcartitem}
                    item={item}
                    businessid={suborder.uuidbusiness}
                    businessName={suborder.businessName}
                  />
                ))}
              </>
            ))}
          </tbody>
        </Table>
      </MediaQuery>
      <MediaQuery largerThan="md" styles={{ display: "none" }}>
        <Stack spacing="md" w="100%" align="center">
          {cart.suborders.map((suborder, id) => (
            <div key={suborder.uuidcartsuborder}>
              {suborder.items.map((item) => (
                <DetailedProductCartView
                  key={item.uuidcartitem}
                  item={item}
                  suborder={suborder}
                  businessid={suborder.uuidbusiness}
                  businessName={suborder.businessName}
                />
              ))}
            </div>
          ))}
        </Stack>
      </MediaQuery>
    </Stack>
  );
};

export default CartView;
