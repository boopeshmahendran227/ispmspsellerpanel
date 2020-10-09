import ProductActions from "../../actions/product";
import { connect } from "react-redux";
import { useState } from "react";
import Button from "./Button";
import CSSConstants from "../../constants/CSSConstants";
import classNames from "classnames";
import { Flex, Input, Link } from "@chakra-ui/core";

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

  const classes = classNames({
    active: showInput,
  });

  return (
    <Flex alignItems="center" className="container">
      <a className={classes} onClick={() => setShowInput(true)}>
        Create New Value
      </a>
      {showInput && (
        <Flex alignItems="center" ml="0.5rem">
          <Input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button onClick={handleAdd}>Add</Button>
        </Flex>
      )}
      <style jsx>{`
        a {
          text-decoration: underline;
          color: ${CSSConstants.primaryColor};
        }
        a.active {
          text-decoration: none;
          font-weight: bold;
          color: ${CSSConstants.primaryTextColor};
        }
      `}</style>
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
