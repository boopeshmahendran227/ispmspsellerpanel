import { Flex, PseudoBox, Box, Divider } from "@chakra-ui/core";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "react-feather";
import { useState } from "react";
import AnimateHeight from "react-animate-height";

interface SubmenuMenuItem {
  name: string;
  href: string;
}

interface MobileSubMenuProps {
  subMenuIcon: React.ReactNode;
  subMenuName: string;
  subMenuItems: SubmenuMenuItem[];
}

const MobileSubMenu = (props: MobileSubMenuProps) => {
  const { subMenuIcon, subMenuName, subMenuItems } = props;
  const [open, setOpen] = useState<boolean>(false);

  return (
    <PseudoBox _hover={{ bg: "secondaryTextColorVariant.100" }}>
      <Flex
        justify="space-between"
        pl={1}
        pr={2}
        onClick={() => {
          setOpen(!open);
        }}
        cursor="pointer"
      >
        <Flex
          flexDirection="row"
          w="full"
          fontSize="md"
          fontWeight="400"
          py={2}
          px={0}
          alignItems="baseline"
        >
          <Box px={2}>{subMenuIcon}</Box>
          <Box>{subMenuName}</Box>
        </Flex>
        {open ? <ChevronUp /> : <ChevronDown />}
      </Flex>
      <AnimateHeight duration={400} height={open ? "auto" : 0}>
        <Box w="full" cursor="pointer">
          {subMenuItems.map((item) => (
            <Link href={item.href}>
              <Box pl={10} py={2}>
                {item.name}
              </Box>
            </Link>
          ))}
        </Box>
      </AnimateHeight>
      <Divider />
    </PseudoBox>
  );
};

export default MobileSubMenu;
