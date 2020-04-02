import CSSConstants from "../constants/CSSConstants";
import { useEffect } from "react";
import { ToastDataInterface, ToastType } from "../types/toast";
import Chroma from "chroma-js";

interface ToastProps {
  data: ToastDataInterface;
  remove: () => void;
}

const Toast = (props: ToastProps) => {
  let header = "";
  let currentColor = "#44c38e";

  switch (props.data.type) {
    case ToastType.success:
      header = "Success";
      currentColor = "#44c38e";
      break;
    case ToastType.error:
      header = "Failed";
      currentColor = "#e54d2a";
      break;
    case ToastType.info:
      header = "Info";
      currentColor = "#007AFF";
      break;
    case ToastType.notification:
      header = "Notification";
      break;
  }

  useEffect(() => {
    // Close after duration
    let closeTimeout = null;

    closeTimeout = setTimeout(() => {
      props.remove();
    }, props.data.duration);
    return () => clearTimeout(closeTimeout);
  }, []);

  return (
    <section className="toast">
      <a className="closeBtn" onClick={props.remove}>
        <i className="fa fa-times" aria-hidden="true"></i>
      </a>
      <div className="iconContainer">
        {props.data.type === ToastType.success && (
          <i className="fa fa-check" aria-hidden="true"></i>
        )}
        {props.data.type === ToastType.error && (
          <i className="fas fa-exclamation-triangle" aria-hidden="true"></i>
        )}
        {props.data.type === ToastType.info && (
          <i className="fa fa-info-circle" aria-hidden="true"></i>
        )}
      </div>
      <div className="content">
        <header>{header}</header>
        <div className="body">{props.data.msg}</div>
      </div>
      <style jsx>{`
        .toast {
          position: relative;
          margin: 1em 0;
          background-color: white;
          box-shadow: 0 3px 10px #00000029;
          transition: all 0.4s ease-in-out;
          padding-right: 3em;
          display: flex;
          z-index: 100;
          text-align: left;
          font-size: 1.1rem;
        }
        .iconContainer {
          padding: 0.7em;
          background: ${currentColor};
          color: ${Chroma(currentColor)
            .brighten(1)
            .css()};
        }
        header {
          font-weight: bold;
        }
        .body {
          color: ${CSSConstants.secondaryTextColor};
          font-size: 0.8rem;
        }
        .content {
          padding: 0.7em;
        }
        .closeBtn {
          position: absolute;
          top: 10px;
          right: 10px;
        }
      `}</style>
    </section>
  );
};

export default Toast;
