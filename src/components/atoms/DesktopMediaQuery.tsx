import withSizes from "react-sizes";

interface OwnProps {
  children: React.ReactNode;
}

interface SizeProps {
  isDesktop: boolean;
}

type DesktopMediaQueryProps = OwnProps & SizeProps;

const DesktopMediaQuery = (props: DesktopMediaQueryProps) => {
  if (!props.isDesktop) {
    return null;
  }

  return <>{props.children}</>;
};

const mapSizesToProps = ({ width }): SizeProps => ({
  isDesktop: width > 800,
});

export default withSizes(mapSizesToProps)(DesktopMediaQuery);
