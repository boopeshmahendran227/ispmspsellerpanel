import Layout from "../src/layouts/main";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import withToastProvider from "../src/components/WithToastProvider";
import { initializeStore } from "../src/store";

// Add all third-party CSS here
import "@fortawesome/fontawesome-free/css/all.css";

function MyApp(props) {
  const { store, Component, pageProps } = props;
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
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
