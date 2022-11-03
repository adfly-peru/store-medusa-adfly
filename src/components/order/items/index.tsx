import useEnrichedLineItems from "../../../lib/hooks/use-enrich-line-items"
import { LineItem, Region } from "@medusajs/medusa"
import { CalculatedVariant } from "../../../types/medusa"
import Thumbnail from "../../products/thumbnail"
import { Link } from "react-router-dom"
import LineItemPrice from "../../common/line-item-price"

type ItemsProps = {
  items: LineItem[]
  region: Region
  cartId: string
}

const Items = ({ items, region, cartId }: ItemsProps) => {
  const enrichedItems = useEnrichedLineItems(items, cartId)

  return (
    <div className="p-10 border-b border-gray-200 gap-y-4 flex flex-col">
      {enrichedItems?.length
        ? enrichedItems.map((item) => {
            return (
              <div className="grid grid-cols-[122px_1fr] gap-x-4" key={item.id}>
                <div className="w-[122px]">
                  <Thumbnail thumbnail={item.thumbnail} size="full" />
                </div>
                <div className="flex flex-col justify-between flex-1">
                  <div className="flex flex-col flex-1 text-small-regular">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-base-regular overflow-ellipsis overflow-hidden whitespace-nowrap mr-4">
                          <Link
                            to={`/products/${item.variant.product.handle}`}
                          >
                            <a>{item.title}</a>
                          </Link>
                        </h3>
                        {item.variant.options.map((option) => {
                          const optionName =
                            item.variant.product.options.find((opt) => opt.id === option.option_id)
                              ?.title || "Option"
                          return (
                            <div key={option.id}>
                              <span>
                                {optionName}: {option.value}
                              </span>
                            </div>
                          )
                        })}
                        <span>Quantity: {item.quantity}</span>
                      </div>
                      <div className="flex justify-end">
                        <LineItemPrice
                          quantity={item.quantity}
                          region={region}
                          variant={item.variant as CalculatedVariant}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        : Array.from(Array(items.length).keys()).map((i) => {
            return <></>
          })}
    </div>
  )
}

export default Items
