import withSizes from "react-sizes";

interface OwnProps {
  children: React.ReactNode;
}

interface SizeProps {
  isMobile: boolean;
}

type MobileMediaQueryProps = OwnProps & SizeProps;

const MobileMediaQuery = (props: MobileMediaQueryProps) => {
  if (!props.isMobile) {
    return null;
  }

  return <>{props.children}</>;
};

const mapSizesToProps = ({ width }): SizeProps => ({
  isMobile: width < 800,
});

export default withSizes(mapSizesToProps)(MobileMediaQuery);
