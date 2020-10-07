import { TierPriceInterface } from "../../types/product";
import SectionHeader from "./SectionHeader";
import SectionCard from "./SectionCard";
import SectionHeaderContainer from "./SectionHeaderContainer";
import { List, ListItem } from "@chakra-ui/core";

interface TierPriceProps {
  tierPrice: TierPriceInterface[];
}

const TierPrice = (props: TierPriceProps) => {
  const { tierPrice } = props;

  if (tierPrice.length === 0) {
    return null;
  }

  return (
    <SectionCard>
      <SectionHeaderContainer>
        <SectionHeader>Tier Price</SectionHeader>
      </SectionHeaderContainer>
      <List spacing={3}>
        {tierPrice.map((item, index) => (
          <ListItem key={index}>
            Buy {item.minQty} Nos at {item.discountPercentage}% off
          </ListItem>
        ))}
      </List>
    </SectionCard>
  );
};

export default TierPrice;
