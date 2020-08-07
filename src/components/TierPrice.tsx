import { TierPriceInterface } from "../types/product";
import SectionHeader from "./SectionHeader";
import SectionCard from "./SectionCard";

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
      <SectionHeader>Tier Price</SectionHeader>
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
