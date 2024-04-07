import { useFilteredProducts } from "@context/filtered-products-context";
import { Center, Loader, SimpleGrid } from "@mantine/core";
import ProductCard from "@modules/products/components/product-card";
import { useHits } from "react-instantsearch";

const FilteredAlgoliaProducts = () => {
  const { hits } = useHits();

  return (
    <SimpleGrid
      w="100%"
      cols={4}
      spacing="xl"
      breakpoints={[
        { maxWidth: "88rem", cols: 3, spacing: "md" },
        { maxWidth: "66rem", cols: 2, spacing: "sm" },
        { maxWidth: "40rem", cols: 1, spacing: "sm" },
      ]}
    >
      {hits.map((hit: any) => (
        <Center key={hit.objectID}>
          <ProductCard
            product={{
              uuidOffer: hit.product_id,
              offerName: hit.product_name,
              description: hit.product_description,
              principalSku: hit.principal_sku,
              type: hit.product_type,
              offerAttributes: [],
              creationDate: hit.creation_date,
              updateDate: hit.update_date,
              tags: hit.product_tags,
              details: {
                refPrice: hit.ref_price,
                adflyPrice: hit.adfly_price,
                offerPrice: hit.offer_price,
                imageURL: hit.image_url,
                discountType: hit.coupon_type,
                discount: hit.coupon_discount,
              },
              variant: [],
              brand: {
                name: hit.brand_name,
              },
              department: {
                name: hit.department_name,
              },
              business: {
                uuidbusiness: "",
                businessname: hit.business_name,
                commercialname: hit.commercial_name,
                deliveryMethods: {
                  deliveryonline: false,
                  deliveryonhome: false,
                  deliveryonstore: false,
                },
              },
              category: {
                name: hit.category_name,
              },
              subCategory: {
                name: hit.subcategory_name,
              },
              status: hit.product_status,
            }}
          />
        </Center>
      ))}
    </SimpleGrid>
  );
};

export default FilteredAlgoliaProducts;
