import Link from "next/link";
import RoundedIcon from "./RoundedIcon";
import {
  Box,
  PseudoBox,
  Heading,
  Divider,
  Stack,
  SimpleGrid,
} from "@chakra-ui/core";

interface LinkInterface {
  icon: React.ReactNode;
  linkText: string;
  href: string;
}

const links: LinkInterface[] = [
  {
    icon: <RoundedIcon icon={<i className="fa fa-plus" />} color={"red"} />,
    linkText: "Add Product",
    href: "/product/new",
  },
  {
    icon: (
      <RoundedIcon icon={<i className="fas fa-warehouse" />} color={"purple"} />
    ),
    linkText: "My Products",
    href: "/product",
  },
  {
    icon: (
      <RoundedIcon
        icon={<i className="fa fa-history" aria-hidden="true" />}
        color={"blue"}
      />
    ),
    linkText: "Recent Orders",
    href: "/#recentOrders",
  },
  {
    icon: (
      <RoundedIcon
        icon={<i className="fa fa-shopping-cart" aria-hidden="true"></i>}
        color={"green"}
      />
    ),
    linkText: "All Orders",
    href: "/order",
  },
  {
    icon: (
      <RoundedIcon
        icon={<i className="fas fa-file-invoice"></i>}
        color={"yellow"}
      />
    ),
    linkText: "Invoices",
    href: "/customerinvoice",
  },
  {
    icon: (
      <RoundedIcon
        icon={<i className="fas fa-clipboard-list"></i>}
        color={"primaryColorVariant"}
      />
    ),
    linkText: "Quotes",
    href: "/quote",
  },
  {
    icon: (
      <RoundedIcon icon={<i className="fas fa-users"></i>} color={"teal"} />
    ),
    linkText: "Customers",
    href: "/customer",
  },
  {
    icon: (
      <RoundedIcon icon={<i className="fas fa-cog"></i>} color={"orange"} />
    ),
    linkText: "Settings",
    href: "/settings",
  },
];

interface IconLinkProps {
  link: LinkInterface;
}

const IconLink = (props: IconLinkProps): JSX.Element => {
  const { link } = props;

  return (
    <Link href={link.href}>
      <PseudoBox
        _hover={{ color: "secondaryColor.500", textDecoration: "underline" }}
        color="secondaryTextColor.500"
        fontWeight="medium"
      >
        <Stack spacing={3} px={2}>
          <Box mx="auto">{link.icon}</Box>
          <Box>{link.linkText}</Box>
        </Stack>
      </PseudoBox>
    </Link>
  );
};

const QuickLinksContainer = (): JSX.Element => {
  return (
    <Box
      boxShadow="0 0 20px #00000014"
      borderRadius={15}
      w="100%"
      marginTop={5}
      p={3}
      bg="white"
    >
      <Heading px={3} py={3} size="md">
        Quick Links
      </Heading>
      <Divider />
      <SimpleGrid
        columns={[4, null, null, 8]}
        spacing={[2, null, null, 1]}
        textAlign="center"
        p={2}
        fontSize={["xs", "sm", "md"]}
        cursor="pointer"
      >
        {links.map((link, index) => (
          <IconLink link={link} key={index} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default QuickLinksContainer;
