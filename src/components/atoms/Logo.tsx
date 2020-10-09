import Link from "next/link";
import LogoIcon from "../../../public/icons/logo2.png";
import { Image, Box, Link as ChakraLink } from "@chakra-ui/core";
const Logo = () => {
  return (
    <Link href="/">
      <ChakraLink
        fontSize="1.5rem"
        fontFamily="Roboto"
        color="#202649"
        textDecoration="none"
        display="flex"
        alignItems="center"
        _hover={{ textDecoration: "none" }}
      >
        <Image h="2.2rem" className="logo" src={LogoIcon} />
        &nbsp;
        <Box as="span" fontSize="2.2rem" fontWeight="500">
          Sellers
        </Box>
      </ChakraLink>
    </Link>
  );
};

export default Logo;
