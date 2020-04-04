import * as React from "react";
import CSSConstants from "../constants/CSSConstants";
import Navbar from "../components/Navbar";
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
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:1747320,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
          }}
        />
      </Head>
      <div className="bodyContainer">
        <Navbar />
        <div className="childrenContainer">{props.children}</div>
      </div>
      <div className="portalRoot"></div>
      <style jsx>{`
        .bodyContainer {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        .childrenContainer {
          flex: 1;
        }
      `}</style>
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
          font-size: 16px;
          background: #f2f3f6;
          font-family: "Lato", sans-serif;
          -webkit-tap-highlight-color: rgba(
            255,
            255,
            255,
            0
          ); /* Disable blue highlight on touch on touch devices */
          color: #212121;
        }
        a {
          color: inherit;
        }
        button {
          background: transparent;
          font-size: inherit;
          color: inherit;
          cursor: pointer;
          outline: none;
          border: none;
        }
        button:focus {
          box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
            0px 4px 5px 0px rgba(0, 0, 0, 0.14),
            0px 1px 10px 0px rgba(0, 0, 0, 0.12);
        }
        input {
          padding: 0.8em;
          margin: 0.5em 0;
          transition: border 0.3s;
          background: #ffffff;
          border: 1px solid ${CSSConstants.borderColor};
        }
        input,
        textarea {
          font-size: 0.8rem;
        }
        input:focus {
          outline: none;
          border: 1px solid ${CSSConstants.primaryColor};
        }
        input::placeholder {
          text-align: center;
        }
        input::-ms-input-placeholder {
          text-align: center;
        }
        table {
          border-collapse: collapse;
        }
        @media only screen and (max-width: 1000px) {
          html,
          body {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;
