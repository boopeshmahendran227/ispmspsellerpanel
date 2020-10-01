import * as React from "react";

interface ErrorMsgProps {
  text?: string;
}

const ErrorMsg = (props: ErrorMsgProps) => {
  return (
    <div className="container">
      <span>{props.text}</span>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          min-height: 200px;
        }
      `}</style>
    </div>
  );
};

ErrorMsg.defaultProps = {
  text: "Something is not right. Please try again"
};

export default ErrorMsg;
