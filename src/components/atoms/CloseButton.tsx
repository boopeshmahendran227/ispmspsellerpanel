import { X } from "react-feather";

interface CloseButtonProps {
  onClick: () => void;
  size?: string;
  color?: string;
}

const CloseButton = (props: CloseButtonProps): JSX.Element => {
  const onClick = (e) => {
    props.onClick();
    e.stopPropagation();
  };

  return (
    <button type="button" onClick={onClick}>
      <X color={props.color ?? "#637381"} size={props.size} />
    </button>
  );
};

export default CloseButton;
