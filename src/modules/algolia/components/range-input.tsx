import { Stack, Group, NumberInput, RangeSlider } from "@mantine/core";
import { useMemo } from "react";
import { useRange } from "react-instantsearch";

const CustomRangeInput = () => {
  const { start, range, refine } = useRange({
    attribute: "final_price",
  });

  const marks = useMemo(() => {
    const step = ((range.max ?? 999999) - (range.min ?? 0)) / 3;
    return Array.from({ length: 4 }, (_, index) => {
      const value = (range.min ?? 0) + step * index;
      return { value, label: `S/.${value.toFixed(0)}` };
    });
  }, [range]);

  return (
    <Stack my="md" spacing="xl" px="xs">
      <RangeSlider
        styles={{
          bar: {
            backgroundColor: "#31658E",
          },
          thumb: {
            color: "#31658E",
            borderColor: "#31658E",
          },
          mark: {
            borderColor: "#31658E !important",
          },
        }}
        mx="md"
        value={[
          start[0] === -Infinity ? range.min ?? 0 : start[0] ?? 0,
          start[1] === Infinity ? range.max ?? 999999 : start[1] ?? 999999,
        ]}
        min={range.min ?? 0}
        max={range.max ?? 999999}
        precision={2}
        step={0.01}
        marks={marks}
        onChange={refine}
      />
      <Group position="apart" mt="md">
        <NumberInput
          maw={80}
          value={start[0] === -Infinity ? range.min : start[0] ?? 0}
          min={range.min ?? 0}
          max={start[1] ?? 999999}
          onChange={(val) => {
            refine([
              val !== "" ? val : undefined,
              start[1] === Infinity ? range.max : start[1],
            ]);
          }}
        />
        <NumberInput
          maw={80}
          value={start[1] === Infinity ? range.max : start[1] ?? 999999}
          min={start[0] ?? 0}
          max={range.max ?? 999999}
          onChange={(val) => {
            refine([
              start[0] === -Infinity ? range.min : start[0],
              val !== "" ? val : undefined,
            ]);
          }}
        />
      </Group>
    </Stack>
  );
};

export default CustomRangeInput;
