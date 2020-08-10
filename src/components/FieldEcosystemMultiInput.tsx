import FieldMultiSelect from "./FieldMultiSelect";
import EcosystemOption from "./atoms/EcosystemOption";
import { BusinessDataInterface } from "types/business";

interface FieldEcosystemMultiInputProps {
  businessData: BusinessDataInterface;
  name: string;
}

const FieldEcosystemMultiInput = (
  props: FieldEcosystemMultiInputProps
): JSX.Element => {
  const { businessData } = props;

  return (
    <FieldMultiSelect
      name={props.name}
      options={[
        {
          value: "Default",
          label: "Istakapaza Default Marketplace",
        },
        ...businessData.ecosystems.map((ecosystem) => ({
          value: ecosystem.ecosystem_id._id,
          label: <EcosystemOption ecosystem={ecosystem} />,
        })),
      ]}
    />
  );
};

export default FieldEcosystemMultiInput;
