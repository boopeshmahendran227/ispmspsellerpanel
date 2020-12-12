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
  onClick?: (e?: any) => void;
  w?: string;
}

const Button = (props: ButtonProps) => {
  const { variantColor, type, variant, isDisabled, isLoading, onClick } = props;
  return (
    <>
      <DesktopMediaQuery>
        <ChakraButton
          _focus={{ boxShadow: "none" }}
          size="sm"
          fontWeight="normal"
          letterSpacing="wider"
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
          _focus={{ boxShadow: "none" }}
          size="sm"
          fontSize="xs"
          fontWeight="normal"
          letterSpacing="widest"
          variantColor={variantColor}
          type={type}
          variant={variant}
          isDisabled={isDisabled}
          isLoading={isLoading}
          onClick={onClick}
          w={props.w}
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
