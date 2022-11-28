import { Button, Center, ScrollArea } from '@mantine/core';

import { useProduct } from '../../../context/product-context';
import CartProduct from '../../../components/cartProductComponent';
import { IconShoppingCart } from '@tabler/icons';

const CartDrawer = () => {

    const { products } = useProduct();

    return (
        <>
            <ScrollArea style={{ height: "80%" }}>
                {
                    products.map( ( prod ): any =>
                        <CartProduct product={prod} />
                    )
                }
            </ScrollArea>
            <Center sx={{height: "15%"}}>
                <Button leftIcon={<IconShoppingCart />} size="md" fullWidth>
                    Ir a caja
                </Button>
            </Center>
        </>
    )
}

export default CartDrawer
  