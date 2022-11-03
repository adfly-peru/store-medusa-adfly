import { Button, Text, Grid, Stack } from "@mantine/core"
import { ProductOption } from "@medusajs/medusa"
import clsx from "clsx"
import React from "react"

const onlyUnique = (value: unknown, index: number, self: unknown[]) =>
  self.indexOf(value) === index

type OptionSelectProps = {
  option: ProductOption
  current: string
  updateOption: (option: Record<string, string>) => void
  title: string
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
}) => {
  const filteredOptions = option.values.map((v) => v.value).filter(onlyUnique)

  return (
    <>
      <Text>Select {title}</Text>
      <Button.Group>
        {filteredOptions.map((v) => {
            return (
                <Button
                  onClick={() => updateOption({ [option.id]: v })}
                  variant = {(v === current) ? "filled" : "outline"}
                >
                  {v}
                </Button>
            )
        })}
      </Button.Group>
    </>
  )
}

export default OptionSelect
