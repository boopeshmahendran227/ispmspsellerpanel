import Layout from "../src/layouts/main";
import NProgress from "nprogress";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import ToastProvider from "components/ToastProvider";
import { initializeStore } from "../src/store";
import Router, { withRouter } from "next/router";
import useSWR, { SWRConfig } from "swr";
import api from "../src/api";
import SureModal from "components/atoms/SureModal";
import ReasonModal from "components/ReasonModal";
import SideNavBar from "components/SideNavBar";
import TopNavBar from "components/TopNavBar";
import LoginActions from "actions/login";
import LoadingScreen from "components/atoms/LoadingScreen";
import UpdateQuoteModal from "components/UpdateQuoteModal";
import { isLoggedIn } from "utils/login";
import { LoginState } from "types/login";
import CSSConstants from "../src/constants/CSSConstants";

// Add all third-party CSS here
import "@fortawesome/fontawesome-free/css/all.css";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "../public/css/react_dates_overrides.css";
import "react-popper-tooltip/dist/styles.css";

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

  const swrConfigData = {
    refreshInterval: 600000,
    fetcher: api,
  };

  useSWR("CheckLoggedIn", () => {
    isLoggedIn().then((loggedIn) => {
      store.dispatch(
        LoginActions.setLoginState(
          loggedIn ? LoginState.LoggedIn : LoginState.NotLoggedIn
        )
      );
    });
  });

  // We don't need navbar for invoice page
  if (["/invoice"].some((str) => router.pathname.includes(str))) {
    return (
      <SWRConfig value={swrConfigData}>
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
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
              <TopNavBar />
              <div className="sideNavBarContainer">
                <SideNavBar />
              </div>
              <div className="bodyContainer">
                <Component {...pageProps} />
              </div>
              <style jsx>{`
                .sideNavBarContainer {
                  position: fixed;
                  top: 0;
                  left: 0;
                  height: 100%;
                  width: ${CSSConstants.sideNavBarWidth};
                  z-index: 1;
                }
                .bodyContainer {
                  margin-left: calc(${CSSConstants.sideNavBarWidth} + 0.7em);
                  margin-right: 0.7em;
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
