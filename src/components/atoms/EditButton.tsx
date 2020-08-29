import { Edit2 } from "react-feather";
import CSSConstants from "../../constants/CSSConstants";

interface EditButtonProps {
  onClick: () => void;
  size?: string;
  color?: string;
}

const EditButton = (props: EditButtonProps): JSX.Element => {
  const onClick = (e) => {
    props.onClick();
    e.stopPropagation();
  };

  return (
    <button onClick={onClick}>
      <Edit2
        color={props.color ?? CSSConstants.primaryColor}
        size={props.size}
      />
    </button>
  );
};

export default EditButton;
