import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

interface TabItem {
  label: string;
  content: React.ReactNode;
}

interface BasicTabsProps {
  items: TabItem[];
  initialValue?: number;
}

export default function BasicTabs({ items, initialValue = 0 }: BasicTabsProps) {
  const [value, setValue] = React.useState<number>(initialValue);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", marginTop: "20px" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="fullWidth"
        >
          {items.map((item, index) => (
            <Tab key={index} label={item.label} />
          ))}
        </Tabs>
      </Box>
      {items.map((item, index) => (
        <CustomTabPanel key={index} value={value} index={index}>
          {item.content}
        </CustomTabPanel>
      ))}
    </Box>
  );
}
