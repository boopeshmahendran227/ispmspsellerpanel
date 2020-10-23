import CSSConstants from "../../constants/CSSConstants";
import classNames from "classnames";
import Chroma from "chroma-js";
import { Button as ChakraButton } from "@chakra-ui/core";
import MobileMediaQuery from "components/atoms/MobileMediaQuery";
import DesktopMediaQuery from "components/atoms/DesktopMediaQuery";

interface ButtonProps {
  variantColor: string;
  type: "button" | "submit" | "reset";
  variant: "outline" | "ghost" | "unstyled" | "link" | "solid";
  isDisabled: boolean;
  isLoading: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

const Button = (props: ButtonProps) => {
  const { variantColor, type, variant, isDisabled, isLoading, onClick } = props;
  return (
    <>
      <DesktopMediaQuery>
        <ChakraButton
          _focus={{ border: "none" }}
          size="md"
          variantColor={variantColor}
          type={type}
          variant={variant}
          isDisabled={isDisabled}
          isLoading={isLoading}
          onClick={onClick}
        >
          {props.children}
        </ChakraButton>
      </DesktopMediaQuery>
      <MobileMediaQuery>
        <ChakraButton
          _focus={{ border: "none" }}
          size="sm"
          fontSize="xs"
          variantColor={variantColor}
          type={type}
          variant={variant}
          isDisabled={isDisabled}
          isLoading={isLoading}
          onClick={onClick}
        >
          {props.children}
        </ChakraButton>
      </MobileMediaQuery>
    </>
  );
};

Button.defaultProps = {
  variantColor: "primaryColorVariant",
  type: "button",
  variant: "solid",
  isDisabled: false,
  isLoading: false,
};

export default Button;
