import styled from "styled-components";

interface PageHeaderContainerProps {
  children: React.ReactNode;
}

const PageHeaderContainer = styled.div<PageHeaderContainerProps>`
  padding: 0.2em 0.2em;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default PageHeaderContainer;
