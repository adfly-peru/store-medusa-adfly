import { Checkbox } from "@mantine/core";

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
    <Checkbox.Group
      value={currentValues}
      onChange={changeValues}
      orientation="vertical"
      spacing="md"
    >
      {Array.from(values.entries()).map((entry) => (
        <Checkbox value={entry[0]} label={entry[1]}></Checkbox>
      ))}
    </Checkbox.Group>
  );
};

export default CheckGroup;
