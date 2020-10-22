import Layout from "../src/layouts/main";
import NProgress from "nprogress";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import ToastProvider from "components/molecules/ToastProvider";
import { initializeStore } from "../src/store";
import Router, { withRouter } from "next/router";
import useSWR, { SWRConfig } from "swr";
import api from "../src/api";
import SureModal from "components/atoms/SureModal";
import ReasonModal from "components/molecules/ReasonModal";
import SideNavBar from "components/template/SideNavBar";
import TopNavBar from "components/template/TopNavBar";
import LoginActions from "actions/login";
import LoadingScreen from "components/atoms/LoadingScreen";
import UpdateQuoteModal from "components/molecules/UpdateQuoteModal";
import { isLoggedIn } from "utils/login";
import { LoginState } from "types/login";
import SimpleReactLightBox from "simple-react-lightbox";
import { ThemeProvider, CSSReset, Box } from "@chakra-ui/core";
import { customTheme } from "../src/theme/theme";
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
      <ThemeProvider>
        <CSSReset />
        <SWRConfig value={swrConfigData}>
          <Provider store={store}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Provider>
        </SWRConfig>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={customTheme}>
      <CSSReset />
      <SWRConfig value={swrConfigData}>
        <Provider store={store}>
          <ToastProvider>
            <LoadingScreen />
            <UpdateQuoteModal />
            <ReasonModal />
            <SureModal />
            <Layout>
              <TopNavBar />
              <Box
                position="fixed"
                top="60px"
                left={0}
                height="100%"
                width="85px"
                zIndex={1}
                display={["none", null, null, "block"]}
              >
                <SideNavBar />
              </Box>
              <Box ml={["0px", null, null, "85px"]}>
                <SimpleReactLightBox>
                  <Component {...pageProps} />
                </SimpleReactLightBox>
              </Box>
            </Layout>
          </ToastProvider>
        </Provider>
      </SWRConfig>
    </ThemeProvider>
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
