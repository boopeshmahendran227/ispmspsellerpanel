import Link from "next/link";
import SubMenu, { SubMenuItemInterface } from "./SubMenu";
import { useState } from "react";
import { useRouter } from "next/router";
import { Box, List, ListItem, PseudoBox } from "@chakra-ui/core";

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
    matchFunc: (path) => path.includes("/visit") || path.includes("/testdrive"),
  },
];

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
      bg="primaryColor"
      color="white"
      boxShadow="md"
      fontSize="sm"
    >
      <Box w="full">
        <List styleType="none">
          {menuTree.map((item, index) => (
            <ListItem key={index}>
              {item.hasSubMenu ? (
                <PseudoBox
                  as="a"
                  _hover={{ bg: "lightPrimaryColor" }}
                  display="flex"
                  flexDirection="column"
                  textAlign="center"
                  w="full"
                  fontSize="lg"
                  fontWeight="400"
                  py={4}
                  px={1}
                  transition="all 0.3s"
                  bg={index === activeIndex ? "lightPrimaryColor" : ""}
                  borderLeft={index === activeIndex ? "2px solid white" : ""}
                  onClick={() =>
                    setCurrentOpenIndex(
                      currentOpenIndex !== index ? index : null
                    )
                  }
                >
                  {item.icon}
                  <Box as="span" fontSize="md">
                    {item.name}
                  </Box>
                </PseudoBox>
              ) : (
                <Link href={item.href} key={index}>
                  <PseudoBox
                    as="a"
                    _hover={{ bg: "lightPrimaryColor" }}
                    display="flex"
                    flexDirection="column"
                    textAlign="center"
                    w="full"
                    fontSize="lg"
                    fontWeight="400"
                    py={4}
                    px={1}
                    transition="all 0.3s"
                    bg={index === activeIndex ? "lightPrimaryColor" : ""}
                    borderLeft={index === activeIndex ? "2px solid white" : ""}
                    onClick={() => setCurrentOpenIndex(null)}
                  >
                    {item.icon}
                    <Box as="span" fontSize="md">
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
