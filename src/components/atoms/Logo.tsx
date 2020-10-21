import Link from "next/link";
import LogoIcon from "../../../public/icons/logo2.png";
import { Image, Box, Link as ChakraLink } from "@chakra-ui/core";
const Logo = () => {
  return (
    <Link href="/">
      <ChakraLink
        color="#202649"
        textDecoration="none"
        display="flex"
        alignItems="center"
        _hover={{ textDecoration: "none" }}
      >
        <Image h={["1.1rem", "2.2rem"]} className="logo" src={LogoIcon} />
        &nbsp;
        <Box
          as="span"
          fontSize={["1rem", "1.9rem"]}
          fontWeight="500"
          fontFamily="Roboto"
        >
          Sellers
        </Box>
      </ChakraLink>
    </Link>
  );
};

export default Logo;
