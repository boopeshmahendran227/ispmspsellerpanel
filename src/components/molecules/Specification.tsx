import { SpecificationInterface } from "../../types/product";
import SectionHeader from "../atoms/SectionHeader";
import styled from "styled-components";
import CSSConstants from "../../constants/CSSConstants";
import { Fragment } from "react";
import SectionCard from "../atoms/SectionCard";
import SectionHeaderContainer from "../atoms/SectionHeaderContainer";

interface SpecificationProps {
  specification: SpecificationInterface;
}

const GroupName = styled.div`
  font-weight: bold;
  font-size: 1.1rem;
`;

const SpecGrid = styled.div`
  margin: 0.5em 0;
  display: grid;
  grid-template-columns: 200px 1fr;
`;

const Key = styled.div`
  color: ${CSSConstants.secondaryTextColor};
`;

const Value = styled.div``;

const Specification = (props: SpecificationProps) => {
  const { specification } = props;

  return (
    <SectionCard>
      <SectionHeaderContainer>
        <SectionHeader>Specification</SectionHeader>
      </SectionHeaderContainer>
      <div>
        {specification.itemGroups.map((group) => (
          <div>
            <GroupName>{group.name}</GroupName>
            {group.items.length > 0 && (
              <SpecGrid>
                {group.items.map((item, itemIndex) => (
                  <Fragment key={itemIndex}>
                    <Key>{item.key}</Key>
                    <Value>{item.value}</Value>
                  </Fragment>
                ))}
              </SpecGrid>
            )}
          </div>
        ))}
      </div>
    </SectionCard>
  );
};

export default Specification;
