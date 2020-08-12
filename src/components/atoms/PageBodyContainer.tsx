import styled from "styled-components";
import CSSConstants from "../../constants/CSSConstants";

interface PageBodyContainerProps {
  children: React.ReactNode;
}

const PageBodyContainer = styled.div<PageBodyContainerProps>`
  padding-bottom: 0.5em;
  background: ${CSSConstants.foregroundColor};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

export default PageBodyContainer;
