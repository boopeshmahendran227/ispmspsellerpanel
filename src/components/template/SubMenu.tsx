import {
  Box,
  Heading,
  IconButton,
  List,
  ListItem,
  Link as ChakraLink,
} from "@chakra-ui/core";
import Link from "next/link";

export interface SubMenuItemInterface {
  name: string;
  href: string;
}

interface SubMenuProps {
  header: string;
  open: boolean;
  onClose: () => void;
  items: SubMenuItemInterface[];
}

const SubMenu = (props: SubMenuProps) => {
  const { open, onClose, items } = props;

  return (
    <Box
      position="absolute"
      top="0"
      left="0"
      w="200px"
      minH="500px"
      bg={"lightPrimaryColorVariant.500"}
      p={4}
      pt={6}
      zIndex={-1}
      ml="80px"
      transform={open ? "translateX(0%)" : "translateX(-110%)"}
      boxShadow="md"
      transition={
        open
          ? "transform 0.33s cubic-bezier(0, 0, 0.3, 1)"
          : " transform 0.13s cubic-bezier(0, 0, 0.3, 1)"
      }
    >
      <Heading size="sm" letterSpacing="wide" pl={2}>
        {props.header}
      </Heading>
      <IconButton
        variant="ghost"
        aria-label="Close"
        icon="close"
        onClick={onClose}
        position="absolute"
        top={5}
        right={2}
        _hover={{ bg: "none" }}
        _active={{ bg: "none", boxShadow: "none" }}
      />
      <List styleType="none" mt={6}>
        {items.map((item, index) => (
          <ListItem key={index} onClick={onClose}>
            <Link href={item.href}>
              <ChakraLink
                display="inline-block"
                _hover={{ bg: "primaryColorVariant.500" }}
                p={2}
                w="100%"
                fontSize="md"
              >
                {item.name}
              </ChakraLink>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SubMenu;
