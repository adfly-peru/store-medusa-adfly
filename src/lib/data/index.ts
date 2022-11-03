import { StoreGetProductsParams } from "@medusajs/medusa"
import { medusaClient } from "../config"

export const fetchProductsList = async (pageParam: number, queryParams: StoreGetProductsParams) => {
    const { products, count, offset } = await medusaClient.products.list({
      limit: 12,
      offset: pageParam,
      ...queryParams,
    })
  
    return {
      response: { products, count },
      nextPage: count > offset + 12 ? offset + 12 : null,
    }
  }