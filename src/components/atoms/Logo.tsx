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
          fontSize={["1rem", "1.8rem"]}
          fontWeight="thin"
          fontFamily="Roboto"
          alignSelf="bottom"
          mt={1}
        >
          Sellers
        </Box>
      </ChakraLink>
    </Link>
  );
};

export default Logo;
