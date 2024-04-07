import { Accordion, Checkbox, Group, Title } from "@mantine/core";
import { NextRouter } from "next/router";
import { useRefinementList } from "react-instantsearch";

const CustomRefinementList = ({
  label,
  attribute,
  router,
}: {
  label: string;
  attribute: string;
  router: NextRouter;
}) => {
  const { items } = useRefinementList({
    attribute,
  });

  if (items.length === 0) return null;

  return (
    <Accordion.Item value={attribute}>
      <Accordion.Control>
        <Title order={6} fw={400} fz={20}>
          {label}
        </Title>
      </Accordion.Control>
      <Accordion.Panel>
        <Group>
          {items.map((item) => (
            <Checkbox
              key={item.label}
              label={`${item.label} (${item.count})`}
              checked={item.isRefined || router.query[attribute] === item.label}
              onChange={(val) => {
                const isChecked = val.currentTarget.checked;
                const newQuery = { ...router.query };
                if (isChecked) {
                  newQuery[attribute] = item.label;
                } else {
                  delete newQuery[attribute];
                }
                router.push(
                  {
                    pathname: "/search",
                    query: newQuery,
                  },
                  undefined,
                  { shallow: true }
                );
              }}
            />
          ))}
        </Group>
      </Accordion.Panel>
    </Accordion.Item>
  );
};

export default CustomRefinementList;
