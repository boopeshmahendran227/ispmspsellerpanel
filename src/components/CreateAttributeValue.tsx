import ProductActions from "../actions/product";
import { connect } from "react-redux";
import { useState } from "react";
import Button from "./atoms/Button";
import CSSConstants from "../constants/CSSConstants";
import classNames from "classnames";

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
    <div className="container">
      <a className={classes} onClick={() => setShowInput(true)}>
        Create New Value
      </a>
      {showInput && (
        <div className="inputContainer">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          ></input>
          <Button onClick={handleAdd}>Add</Button>
        </div>
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
        .inputContainer {
          display: flex;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

const mapDispatchToProps: DispatchProps = {
  addAttributeValue: ProductActions.addAttributeValue,
};

export default connect<null, DispatchProps>(
  null,
  mapDispatchToProps
)(CreateAttributeValue);
