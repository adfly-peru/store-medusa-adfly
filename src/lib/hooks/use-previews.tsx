import { Product, Region } from "@medusajs/medusa"
import { useMemo } from "react"
import { InfiniteProductPage, ProductPreviewType } from "../../types/global"

type UsePreviewProps<T> = {
  pages?: T[]
  region?: Region
}

const usePreviews = <T extends InfiniteProductPage>({
  pages,
  region,
}: UsePreviewProps<T>) => {
  const products: Product[] = []

  if (!pages) {
    return []
  }

  for (const page of pages) {
    products.push(...page.response.products)
  }
  return products
}

export default usePreviews
