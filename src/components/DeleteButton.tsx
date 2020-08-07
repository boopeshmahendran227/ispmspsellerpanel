import { Trash2 } from "react-feather";
import CSSConstants from "../constants/CSSConstants";

interface DeleteButtonProps {
  onClick: () => void;
  color?: string;
  size?: string;
}

const DeleteButton = (props: DeleteButtonProps): JSX.Element => {
  const onClick = (e) => {
    props.onClick();
    e.stopPropagation();
  };

  return (
    <button onClick={onClick}>
      <Trash2
        color={props.color ?? CSSConstants.dangerColor}
        size={props.size}
      />
    </button>
  );
};

export default DeleteButton;
