import ProductActions from "../../actions/product";
import { connect } from "react-redux";
import { useState } from "react";
import { Flex, Input, Button, Link } from "@chakra-ui/core";

interface DispatchProps {
  addAttributeValue: (attributeId: number, value: string) => void;
}

interface OwnProps {
  attributeId: number;
}

type CreateAttributeValueProps = DispatchProps & OwnProps;

const CreateAttributeValue = (props: CreateAttributeValueProps) => {
  const [showInput, setShowInput] = useState(false);
  const [value, setValue] = useState("");

  const handleAdd = () => {
    props.addAttributeValue(props.attributeId, value);
    setShowInput(false);
  };

  return (
    <Flex alignItems="center">
      <Link
        color={showInput ? "primaryTextColor" : "primaryColor"}
        fontWeight={showInput ? "bold" : "normal"}
        cursor="default"
        onClick={() => setShowInput(true)}
      >
        Create New Value
      </Link>
      {showInput && (
        <Flex alignItems="center">
          <Input
            mx={4}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button variantColor="primaryColorVariant" onClick={handleAdd}>
            Add
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

const mapDispatchToProps: DispatchProps = {
  addAttributeValue: ProductActions.addAttributeValue,
};

export default connect<null, DispatchProps>(
  null,
  mapDispatchToProps
)(CreateAttributeValue);
