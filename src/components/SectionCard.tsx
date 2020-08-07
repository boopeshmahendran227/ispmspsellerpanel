import Card from "./Card";
import styled from "styled-components";

interface SectionCardProps {
  children: React.ReactNode;
}

const Container = styled.div`
  margin: 1em 0;
`;

const SectionCard = (props: SectionCardProps): JSX.Element => {
  return (
    <Container>
      <Card>{props.children}</Card>
    </Container>
  );
};

export default SectionCard;
