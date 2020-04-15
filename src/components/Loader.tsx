import * as React from "react";

interface LoaderProps {
  width: string;
  height: string;
}

const Loader = (props: LoaderProps) => {
  return (
    <div className="container">
      <img className="loader" src="/icons/loader.svg" />
      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: ${props.width};
          height: ${props.height};
          overflow: hidden;
        }
        .loader {
          width: 2rem;
        }
      `}</style>
    </div>
  );
};

Loader.defaultProps = {
  width: "100%",
  height: "200px",
};

export default Loader;
