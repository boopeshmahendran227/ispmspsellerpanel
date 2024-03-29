import * as React from "react";
import CSSConstants from "../constants/CSSConstants";
import Head from "next/head";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
  return (
    <div>
      <Head>
        <title>Istakapaza Sellers</title>
        <link
          href="https://fonts.googleapis.com/css?family=Lato:400,500,700&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:300&display=swap"
          rel="stylesheet"
        ></link>
        <link rel="stylesheet" type="text/css" href="/css/nprogress.css" />
      </Head>
      <div>{props.children}</div>
      <div className="portalRoot"></div>
      <style jsx global>{`
        * {
          box-sizing: border-box;
          outline-color: ${CSSConstants.outlineColor};
          background-clip: padding-box;
        }
        html,
        body {
          padding: 0;
          margin: 0;
          background: ${CSSConstants.backgroundColor};
          font-family: "Lato", sans-serif;
          -webkit-tap-highlight-color: rgba(
            255,
            255,
            255,
            0
          ); /* Disable blue highlight on touch on touch devices */
          color: ${CSSConstants.primaryTextColor};
        }
        a {
          color: inherit;
          cursor: pointer;
        }
        button {
          background: transparent;
          font-size: inherit;
          color: inherit;
          cursor: pointer;
          outline: none;
          border: none;
        }
        button:active {
          box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
            0px 4px 5px 0px rgba(0, 0, 0, 0.14),
            0px 1px 10px 0px rgba(0, 0, 0, 0.12);
        }
        table {
          border-collapse: collapse;
        }
        td,
        th {
          padding: 0.35em;
        }
      `}</style>
    </div>
  );
};

export default Layout;
