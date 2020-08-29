import styled from "styled-components";

interface PageContainerProps {
  children: React.ReactNode;
}

const PageContainer = styled.div<PageContainerProps>`
  margin: 0.5em 2em;
`;

export default PageContainer;
