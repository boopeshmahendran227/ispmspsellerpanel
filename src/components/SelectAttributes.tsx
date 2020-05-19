import useSWR from "swr";
import { AttributeInterface, SelectedAttribute } from "../types/product";
import Error from "next/error";
import Loader from "../../src/components/Loader";
import MultiSelect from "../../src/components/MultiSelect";
import { RootState } from "../reducers";
import ProductActions from "../../src/actions/product";
import { connect } from "react-redux";
import { getSelectedAttributes } from "../../src/selectors/product";

interface StateProps {
  selectedAttributes: SelectedAttribute[];
}

interface DispatchProps {
  setSelectedAttributes: (selectedAttributes: SelectedAttribute[]) => void;
}

type SelectAttributesProps = StateProps & DispatchProps;

const SelectAttributes = (props: SelectAttributesProps) => {
  const attributeSWR = useSWR("/attribute");
  const attributes: AttributeInterface[] = attributeSWR.data;

  const error = attributeSWR.error;

  if (error) {
    return <Error title="Unexpected error occured" statusCode={500} />;
  }

  if (!attributes) {
    return <Loader />;
  }

  const attributeOptions = attributes.map((attribute) => ({
    value: attribute.id,
    label: attribute.name,
  }));

  const selectedOption = props.selectedAttributes.map((attribute) => ({
    value: attribute.attributeId,
    label: attribute.attributeName,
  }));

  const handleChange = (selectedOption) => {
    props.setSelectedAttributes(
      selectedOption.map(
        (option): SelectedAttribute => ({
          attributeId: option.value,
          attributeName: option.label,
        })
      )
    );
  };

  return (
    <div className="container">
      <header>Step 1: Select Attributes </header>
      <div className="selectContainer">
        <MultiSelect
          value={selectedOption}
          onChange={handleChange}
          options={attributeOptions}
        />
      </div>
      <style jsx>{`
        header {
          font-size: 1.2rem;
          font-weight: bold;
          margin-bottom: 1em;
        }
      `}</style>
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  selectedAttributes: getSelectedAttributes(state),
});

const mapDispatchToProps: DispatchProps = {
  setSelectedAttributes: ProductActions.setSelectedAttributes,
};

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(SelectAttributes);
