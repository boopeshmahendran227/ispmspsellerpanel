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
      <Tabs onChange={(index) => setTabIndex(index)}>
        <TabList>
          {props.headingList.map((heading) => (
            <Tab fontSize={["xs", "md"]}>{heading}</Tab>
          ))}
        </TabList>
        <TabPanels fontSize={["xs", "md"]}>
          {props.contentList.map((content) => (
            <TabPanel>{content}</TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default TabSection;
