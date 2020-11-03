import {
  Box,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  ListItem,
  List,
  PseudoBox,
  Divider,
  Text,
  Stack,
} from "@chakra-ui/core";
import { Menu } from "react-feather";
import Link from "next/link";
import MobileSubMenu from "./MobileSubMenu";
import { useState } from "react";
import menuTree from "../../data/menu";

interface MobileSideNavBarProps {
  handleLogout: () => void;
}

const MobileSideNavBar = (props: MobileSideNavBarProps) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  return (
    <Box>
      <Menu onClick={() => setMenuIsOpen(!menuIsOpen)} />
      <Drawer
        isOpen={menuIsOpen}
        placement="left"
        onClose={() => setMenuIsOpen(false)}
        size="xs"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Hello Seller</DrawerHeader>
          <DrawerCloseButton />
          <DrawerBody p={0} overflowY="auto">
            <List styleType="none">
              {menuTree.map((item, index) =>
                item.hasSubMenu ? (
                  <ListItem key={index}>
                    <MobileSubMenu
                      subMenuName={item.name}
                      subMenuIcon={item.icon}
                      subMenuItems={item.subMenuItems}
                    />
                  </ListItem>
                ) : (
                  <ListItem key={index}>
                    <Link href={item.href}>
                      <PseudoBox
                        as="a"
                        _hover={{ bg: "secondaryTextColor.500" }}
                        display="flex"
                        flexDirection="row"
                        w="full"
                        fontSize="md"
                        fontWeight="400"
                        py={2}
                        px={1}
                        transition="all 0.3s"
                        alignItems="baseline"
                      >
                        <Box px={2}>{item.icon}</Box>
                        <Box>{item.name}</Box>
                      </PseudoBox>
                    </Link>
                    <Divider />
                  </ListItem>
                )
              )}
              <ListItem>
                <Stack
                  alignItems="baseline"
                  isInline
                  spacing={3}
                  onClick={props.handleLogout}
                  cursor="pointer"
                  px={3}
                >
                  <Box>
                    <i className="fas fa-sign-out-alt" aria-hidden={true}></i>{" "}
                  </Box>
                  <Text>Logout</Text>
                </Stack>
              </ListItem>
            </List>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default MobileSideNavBar;
