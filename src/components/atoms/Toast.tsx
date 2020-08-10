import CSSConstants from "../../constants/CSSConstants";
import { useEffect } from "react";
import { ToastDataInterface, ToastType } from "../../types/toast";
import Chroma from "chroma-js";

interface ToastProps {
  data: ToastDataInterface;
  remove: () => void;
}

const getToastHeader = (type: ToastType, header: string) => {
  switch (type) {
    case ToastType.success:
      return "Success";
    case ToastType.error:
      return "Failed";
    case ToastType.info:
      return "Info";
    case ToastType.notification:
      return header;
  }
  return "Info";
};

const getToastColor = (type: ToastType) => {
  switch (type) {
    case ToastType.success:
      return "#44c38e";
    case ToastType.error:
      return "#e54d2a";
    case ToastType.info:
      return "#007AFF";
    case ToastType.notification:
      return "#007AFF";
  }
  return "#44c38e";
};

const Toast = (props: ToastProps) => {
  const header = getToastHeader(props.data.type, props.data.header);
  const currentColor = getToastColor(props.data.type);

  useEffect(() => {
    // Close after duration
    const closeTimeout = setTimeout(() => {
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
        {props.data.type === ToastType.notification && (
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
          display: flex;
          align-items: center;
          background: ${currentColor};
          color: ${Chroma(currentColor).brighten(1).css()};
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
