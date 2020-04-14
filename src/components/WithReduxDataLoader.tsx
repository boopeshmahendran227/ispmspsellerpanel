import Loader from "./Loader";
import hoistNonReactStatics from "hoist-non-react-statics";
import ErrorMsg from "./ErrorMsg";
import useSWR from "swr";

// Gets the display name of a JSX component for dev tools
const getDisplayName = (Component) =>
  Component.displayName || Component.name || "Component";

interface LoaderConfigInterface {
  width: string;
  height: string;
}

const WithLoader = (
  mapPropsToLoadData,
  loaderConfig: LoaderConfigInterface = null
) => {
  return (WrappedComponent: any) => {
    const withLoader = (props) => {
      const loadDataList = mapPropsToLoadData(props);

      useSWR("ReduxData" + getDisplayName(WrappedComponent), () => {
        loadDataList.forEach((loadData) => loadData.fetch());
      });

      if (
        loadDataList.some((loadData) => {
          // if loading has failed, show error
          return (
            loadData.loadingState.isFetching === false &&
            loadData.loadingState.didSucceed === false
          );
        })
      ) {
        return <ErrorMsg />;
      } else if (
        loadDataList.some((loadData) => {
          // if the data is not there, show the loader
          return !loadData.data;
        })
      ) {
        return <Loader {...loaderConfig} />;
      }
      return <WrappedComponent {...props} />;
    };

    withLoader.getInitialProps = async (ctx) => {
      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx));

      return { ...componentProps };
    };

    withLoader.displayName = `WithLoader(${getDisplayName(WrappedComponent)})`;

    hoistNonReactStatics(withLoader, WrappedComponent);

    return withLoader;
  };
};

export default WithLoader;
