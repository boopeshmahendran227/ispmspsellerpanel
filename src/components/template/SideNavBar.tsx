import Link from "next/link";
import SubMenu, { SubMenuItemInterface } from "./SubMenu";
import { useState } from "react";
import { useRouter } from "next/router";
import { Box, List, ListItem, PseudoBox } from "@chakra-ui/core";
import menuTree from "../../data/menu";

const SideNavBar = () => {
  const [currentOpenIndex, setCurrentOpenIndex] = useState<number | null>(null);
  const router = useRouter();
  const activePath = router.pathname;

  const getCurrentActiveIndex = () => {
    if (currentOpenIndex !== null) {
      return currentOpenIndex;
    }

    const currentActiveIndex = menuTree.findIndex(
      (item) => item.matchFunc && item.matchFunc(activePath)
    );

    if (currentActiveIndex !== -1) {
      return currentActiveIndex;
    }

    return 0;
  };

  const activeIndex = getCurrentActiveIndex();

  return (
    <Box
      as="nav"
      position="absolute"
      top="0"
      left="0"
      w="100%"
      h="100%"
      bg="primaryColorVariant.500"
      color="white"
      boxShadow="md"
      fontSize="xs"
    >
      <Box w="full">
        <List styleType="none">
          {menuTree.map((item, index) => (
            <ListItem key={index}>
              {item.hasSubMenu ? (
                <PseudoBox
                  as="a"
                  _hover={{ bg: "lightPrimaryColorVariant.500" }}
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  textAlign="center"
                  w="full"
                  fontWeight="thin"
                  py={3}
                  px={1}
                  transition="all 0.3s"
                  bg={index === activeIndex ? "lightPrimaryColorVariant.500" : ""}
                  borderLeft={index === activeIndex ? "2px solid white" : ""}
                  onClick={() =>
                    setCurrentOpenIndex(
                      currentOpenIndex !== index ? index : null
                    )
                  }
                >
                  <Box fontSize="lg">{item.icon}</Box>
                  <Box as="span" fontSize="sm">
                    {item.name}
                  </Box>
                </PseudoBox>
              ) : (
                <Link href={item.href} key={index}>
                  <PseudoBox
                    as="a"
                    _hover={{ bg: "lightPrimaryColorVariant.500" }}
                    display="flex"
                    flexDirection="column"
                    textAlign="center"
                    justifyContent="space-between"
                    w="full"
                    fontWeight="400"
                    py={3}
                    px={1}
                    transition="all 0.3s"
                    bg={index === activeIndex ? "lightPrimaryColorVariant.500" : ""}
                    borderLeft={index === activeIndex ? "2px solid white" : ""}
                    onClick={() => setCurrentOpenIndex(null)}
                  >
                    <Box fontSize="lg">{item.icon}</Box>
                    <Box as="span" fontSize="sm">
                      {item.name}
                    </Box>
                  </PseudoBox>
                </Link>
              )}
            </ListItem>
          ))}
        </List>
      </Box>
      {menuTree.map(
        (item, index) =>
          item.hasSubMenu && (
            <SubMenu
              key={index}
              header={item.name}
              open={currentOpenIndex === index}
              items={item.subMenuItems}
              onClose={() => setCurrentOpenIndex(null)}
            />
          )
      )}
    </Box>
  );
};

export default SideNavBar;
