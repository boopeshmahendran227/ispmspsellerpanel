import Layout from "../src/layouts/main";
import NProgress from "nprogress";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import ToastProvider from "../src/components/ToastProvider";
import { initializeStore } from "../src/store";
import Router, { withRouter } from "next/router";
import { SWRConfig } from "swr";
import api from "../src/api";
import SureModal from "../src/components/SureModal";
import ReasonModal from "../src/components/ReasonModal";
import SideNavBar from "../src/components/SideNavBar";
import TopNavBar from "../src/components/TopNavBar";

// Add all third-party CSS here
import "@fortawesome/fontawesome-free/css/all.css";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "../public/css/react_dates_overrides.css";
import WithAuth from "../src/components/WithAuth";
import LoadingScreen from "../src/components/LoadingScreen";
import UpdateQuoteModal from "../src/components/UpdateQuoteModal";

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
  const { store, Component, router, pageProps } = props;

  const AuthComponent = WithAuth(Component);

  const swrConfigData = {
    refreshInterval: 600000,
    fetcher: api,
  };

  // We don't need navbar and redux for invoice page
  if (["invoice"].some((str) => router.pathname.includes(str))) {
    return (
      <SWRConfig value={swrConfigData}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SWRConfig>
    );
  }

  return (
    <SWRConfig value={swrConfigData}>
      <Provider store={store}>
        <ToastProvider>
          <LoadingScreen />
          <UpdateQuoteModal />
          <ReasonModal />
          <SureModal />
          <Layout>
            <main>
              <div className="sideNavBarContainer">
                <SideNavBar />
              </div>
              <div className="bodyContainer">
                <TopNavBar />
                <AuthComponent {...pageProps} />
              </div>
              <style jsx>{`
                .sideNavBarContainer {
                  position: fixed;
                  top: 0;
                  left: 0;
                  height: 100%;
                  width: 190px;
                  z-index: 1;
                }
                .bodyContainer {
                  margin-left: 190px;
                }
              `}</style>
            </main>
          </Layout>
        </ToastProvider>
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

export default withRedux(initializeStore)(withReduxSaga(withRouter(MyApp)));
