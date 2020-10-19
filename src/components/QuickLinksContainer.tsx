import Link from "next/link";
import RoundedIcon from "./atoms/RoundedIcon";
import { Box, PseudoBox, Heading } from "@chakra-ui/core";

interface LinkInterface {
  icon: React.ReactNode;
  linkText: string;
  href: string;
}

const links: LinkInterface[] = [
  {
    icon: <RoundedIcon icon={<i className="fa fa-plus" />} color={"#e53935"} />,
    linkText: "Add Product",
    href: "/product/new",
  },
  {
    icon: (
      <RoundedIcon
        icon={<i className="fas fa-warehouse" />}
        color={"#8E24AA"}
      />
    ),
    linkText: "My Products",
    href: "/product",
  },
  {
    icon: (
      <RoundedIcon
        icon={<i className="fa fa-history" aria-hidden="true" />}
        color={"#039BE5"}
      />
    ),
    linkText: "Recent Orders",
    href: "/#recentOrders",
  },
  {
    icon: (
      <RoundedIcon
        icon={<i className="fa fa-shopping-cart" aria-hidden="true"></i>}
        color={"#43A047"}
      />
    ),
    linkText: "All Orders",
    href: "/order",
  },
  {
    icon: (
      <RoundedIcon
        icon={<i className="fas fa-file-invoice"></i>}
        color={"#FFB300"}
      />
    ),
    linkText: "Invoices",
    href: "/customerinvoice",
  },
  {
    icon: (
      <RoundedIcon
        icon={<i className="fas fa-clipboard-list"></i>}
        color={"#3949AB"}
      />
    ),
    linkText: "Quotes",
    href: "/quote",
  },
  {
    icon: (
      <RoundedIcon icon={<i className="fas fa-users"></i>} color={"#00897B"} />
    ),
    linkText: "Customers",
    href: "/customer",
  },
  {
    icon: (
      <RoundedIcon icon={<i className="fas fa-cog"></i>} color={"#F4511E"} />
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
        _hover={{ textDecoration: "underline", color: "secondaryColor" }}
        display="inline-flex"
        flexDirection="column"
        alignItems="center"
        cursor="pointer"
        textAlign="center"
        my={1}
        mx={3}
        w="120px"
      >
        <Box>{link.icon}</Box>
        <PseudoBox
          _hover={{ color: "secondaryColor" }}
          mt={1}
          fontSize="md"
          color="secondaryTextColor"
        >
          {link.linkText}
        </PseudoBox>
      </PseudoBox>
    </Link>
  );
};

const QuickLinksContainer = (): JSX.Element => {
  return (
    <Box
      boxShadow="0 0 20px #00000014"
      borderRadius={10}
      w="100%"
      marginTop={5}
      className="card"
    >
      <Heading px={3} py={3} size="md">
        Quick Links
      </Heading>
      <Box textAlign="center">
        {links.map((link) => (
          <IconLink link={link} />
        ))}
      </Box>
    </Box>
  );
};

export default QuickLinksContainer;
