import styled from "styled-components";
import CSSConstants from "../../constants/CSSConstants";
import Link from "next/link";

interface BackLinkProps {
  children: React.ReactNode;
  href: string;
  as?: string;
}

const Anchor = styled.a`
  display: block;
  color: ${CSSConstants.secondaryTextColor};
  transition: all 0.3s;
  &:hover {
    color: ${CSSConstants.primaryTextColor};
  }
`;

const BackLink = (props: BackLinkProps): JSX.Element => {
  return (
    <Link href={props.href} as={props.as}>
      <Anchor>
        <i className="icon fas fa-chevron-left"></i> {props.children}
      </Anchor>
    </Link>
  );
};

export default BackLink;
