import { Checkbox, Group } from "@mantine/core";

const CheckGroup = ({
  values,
  currentValues,
  changeValues,
}: {
  values: Map<string, string>;
  currentValues: string[];
  changeValues: (newValues: string[]) => void;
}) => {
  return (
    <Checkbox.Group value={currentValues} onChange={changeValues}>
      <Group mt="xs">
        {Array.from(values.entries()).map((entry, idx) => (
          <Checkbox key={idx} value={entry[0]} label={entry[1]}></Checkbox>
        ))}
      </Group>
    </Checkbox.Group>
  );
};

export default CheckGroup;
