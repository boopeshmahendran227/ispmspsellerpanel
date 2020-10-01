import { TierPriceInterface } from "../types/product";
import SectionHeader from "./atoms/SectionHeader";
import SectionCard from "./atoms/SectionCard";
import SectionHeaderContainer from "./atoms/SectionHeaderContainer";

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
      <ul>
        {tierPrice.map((item, index) => (
          <li key={index}>
            Buy {item.minQty} Nos at {item.discountPercentage}% off
          </li>
        ))}
      </ul>
    </SectionCard>
  );
};

export default TierPrice;
