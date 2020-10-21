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
import { SubMenuItemInterface } from "./SubMenu";
import MobileSubMenu from "./MobileSubMenu";
import { useState } from "react";

interface MobileSideNavBarProps {
  handleLogout: () => void;
}

type MenuTreeItem = SubmenuMenuItem | NoSubmenuMenuItem;

interface NoSubmenuMenuItem {
  name: string;
  hasSubMenu?: false;
  href: string;
  matchFunc?: (path: string) => boolean;
  icon: React.ReactNode;
}

interface SubmenuMenuItem {
  name: string;
  hasSubMenu: true;
  matchFunc?: (path: string) => boolean;
  icon: React.ReactNode;
  subMenuItems: SubMenuItemInterface[];
}

const MobileSideNavBar = (props: MobileSideNavBarProps) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const menuTree: MenuTreeItem[] = [
    {
      name: "Home",
      href: "/",
      icon: <i className="fas fa-home" aria-hidden={true}></i>,
    },
    {
      name: "Sales",
      hasSubMenu: true,
      matchFunc: (path) =>
        path.includes("/order") ||
        path.includes("customerinvoice") ||
        path.includes("/quote"),
      subMenuItems: [
        {
          name: "Order",
          href: "/order",
        },
        {
          name: "Quotes",
          href: "/quote",
        },
        {
          name: "Invoices",
          href: "/customerinvoice",
        },
      ],
      icon: <i className="fas fa-shopping-cart" aria-hidden={true}></i>,
    },
    {
      name: "Catalog",
      hasSubMenu: true,
      subMenuItems: [
        {
          name: "Products",
          href: "/product",
        },
        {
          name: "Drafts",
          href: "/draft",
        },
      ],
      matchFunc: (path) => path.includes("/product") || path.includes("/draft"),
      icon: <i className="fas fa-warehouse" aria-hidden={true}></i>,
    },
    {
      name: "Customers",
      href: "/customer",
      icon: <i className="fas fa-users" aria-hidden="true"></i>,
      matchFunc: (path) => path.includes("/customer"),
    },
    {
      name: "Discounts",
      hasSubMenu: true,
      subMenuItems: [
        {
          name: "Coupons",
          href: "/coupon",
        },
      ],
      icon: <i className="fas fa-tag"></i>,
      matchFunc: (path) => path.includes("/coupon"),
    },
    {
      name: "Insights",
      href: "/insights",
      icon: <i className="fas fa-chart-line"></i>,
      matchFunc: (path) => path.includes("/insights"),
    },
    {
      name: "Others",
      hasSubMenu: true,
      subMenuItems: [
        {
          name: "Showroom Visits",
          href: "/visit",
        },
        {
          name: "Test Rides",
          href: "/testdrive",
        },
      ],
      icon: <i className="fa fa-ellipsis-h" aria-hidden="true"></i>,
      matchFunc: (path) =>
        path.includes("/visit") || path.includes("/testdrive"),
    },
    {
      name: "Settings",
      href: "/settings",
      icon: <i className="fas fa-cog"></i>,
      matchFunc: (path) => path.includes("/settings"),
    },
  ];

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
                        _hover={{ bg: "secondaryTextColor" }}
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
