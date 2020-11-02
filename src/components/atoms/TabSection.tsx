import * as React from "react";
import { useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from "@chakra-ui/core";

interface TabSectionProps {
  headingList: string[];
  contentList: React.ReactNode[];
}

const TabSection = (props: TabSectionProps) => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Box overflowX="auto">
      <Tabs
        onChange={(index) => setTabIndex(index)}
        variantColor="secondaryColorVariant"
        isFitted
      >
        <TabList px={2}>
          {props.headingList.map((heading, index) => (
            <Tab
              key={index}
              py={4}
              _focus={{ boxShadow: "none" }}
              _active={{ bg: "none" }}
              fontSize={["xs", "md"]}
              _selected={{
                fontWeight: "bold",
                borderBottom: "3px solid",
                borderColor: "primaryColorVariant.500",
                color: "primaryColorVariant.500",
              }}
            >
              {heading}
            </Tab>
          ))}
        </TabList>
        <TabPanels fontSize={["xs", "md"]}>
          {props.contentList.map((content, index) => (
            <TabPanel key={index}>{content}</TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default TabSection;
