import CSSConstants from "../../constants/CSSConstants";
import Link from "next/link";
import { PseudoBox } from "@chakra-ui/core";

interface BackLinkProps {
  children: React.ReactNode;
  href: string;
  as?: string;
}

const BackLink = (props: BackLinkProps): JSX.Element => {
  return (
    <Link href={props.href} as={props.as}>
      <PseudoBox
        as="a"
        display="block"
        color={CSSConstants.secondaryTextColor}
        transition="all 0.3s"
        _hover={{ color: `${CSSConstants.primaryTextColor}` }}
      >
        <i className="icon fas fa-chevron-left" />
        {props.children}
      </PseudoBox>
    </Link>
  );
};

export default BackLink;
