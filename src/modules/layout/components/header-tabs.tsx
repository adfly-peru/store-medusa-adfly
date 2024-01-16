import { useProduct } from "@context/product-context";
import { ScrollArea, Tabs } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";
import * as amplitude from "@amplitude/analytics-browser";

const HeaderTabs = () => {
  const router = useRouter();
  const { campaigns } = useProduct();
  if (campaigns.length === 0) {
    return <></>;
  }
  return (
    <div>
      <Tabs
        variant="pills"
        radius="xs"
        color="gray"
        value={""}
        onTabChange={(value) => {
          amplitude.track("Search Product", {
            campaign:
              campaigns.find((v) => v.uuidcampaign === value)?.name ?? "",
            origin: "Campaign Tabs",
          });
          router.push(`/search?campaign=${value}`);
        }}
      >
        <ScrollArea scrollbarSize={2}>
          <Tabs.List style={{ display: "flex", flexWrap: "nowrap" }}>
            {campaigns.map((c) => (
              <Tabs.Tab key={c.uuidcampaign} value={c.uuidcampaign}>
                {c.name}
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </ScrollArea>
      </Tabs>
    </div>
  );
};

export default HeaderTabs;
