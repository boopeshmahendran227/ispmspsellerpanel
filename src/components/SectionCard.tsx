import Card from "./Card";
import styled from "styled-components";

interface SectionCardProps {
  children: React.ReactNode;
}

const Container = styled.div``;

const SectionCard = (props: SectionCardProps): JSX.Element => {
  return (
    <Container>
      <Card>{props.children}</Card>
    </Container>
  );
};

export default SectionCard;
