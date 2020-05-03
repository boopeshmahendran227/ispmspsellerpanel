import Layout from "../src/layouts/main";
import NProgress from "nprogress";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import withToastProvider from "../src/components/WithToastProvider";
import { initializeStore } from "../src/store";
import Router from "next/router";
import { SWRConfig } from "swr";
import api from "../src/api";
import SureModal from "../src/components/SureModal";
import LoadingScreen from "../src/components/LoadingScreen";
import ReasonModal from "../src/components/ReasonModal";

// Add all third-party CSS here
import "@fortawesome/fontawesome-free/css/all.css";
import WithAuth from "../src/components/WithAuth";

NProgress.configure({ showSpinner: false });

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => {
  window.scrollTo(0, 0);
  NProgress.done();
});
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp(props) {
  const { store, Component, pageProps } = props;

  const AuthComponent = WithAuth(Component);

  return (
    <SWRConfig
      value={{
        refreshInterval: 10000,
        fetcher: api,
      }}
    >
      <Provider store={store}>
        <ReasonModal />
        <SureModal />
        <Layout>
          <AuthComponent {...pageProps} />
        </Layout>
      </Provider>
    </SWRConfig>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps };
};

export default withRedux(initializeStore)(
  withReduxSaga(withToastProvider(MyApp))
);
