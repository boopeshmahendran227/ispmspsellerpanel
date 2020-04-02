import * as React from "react";
import Loader from "./Loader";
import hoistNonReactStatics from "hoist-non-react-statics";
import ErrorMsg from "./ErrorMsg";

// Gets the display name of a JSX component for dev tools
const getDisplayName = Component =>
  Component.displayName || Component.name || "Component";

const WithLoader = (mapPropsToLoadData, text = "Loading...") => {
  return (WrappedComponent: any) => {
    class withLoader extends React.Component<any> {
      static displayName = `WithLoader(${getDisplayName(WrappedComponent)})`;

      static async getInitialProps(ctx) {
        const componentProps =
          WrappedComponent.getInitialProps &&
          (await WrappedComponent.getInitialProps(ctx));

        return { ...componentProps };
      }
      componentDidMount() {
        const loadDataList = mapPropsToLoadData(this.props);
        loadDataList.forEach(loadData => {
          if (!loadData.data) {
            loadData.fetch();
          }
        });
      }

      render() {
        const loadDataList = mapPropsToLoadData(this.props);
        if (
          loadDataList.some(loadData => {
            // if loading has failed, show error
            return (
              loadData.loadingState.isFetching === false &&
              loadData.loadingState.didSucceed === false
            );
          })
        ) {
          return <ErrorMsg />;
        } else if (
          loadDataList.some(loadData => {
            // if the data is not there, show the loader
            return !loadData.data;
          })
        ) {
          return <Loader />;
        }
        return <WrappedComponent {...this.props} />;
      }
    }

    hoistNonReactStatics(withLoader, WrappedComponent);

    return withLoader;
  };
};

export default WithLoader;
