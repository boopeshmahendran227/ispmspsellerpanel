import CSSConstants from "../constants/CSSConstants";

interface EmptyMsgProps {
  icon?: React.ReactNode;
  msg: string;
}

const EmptyMsg = (props: EmptyMsgProps) => {
  return (
    <div className="container">
      <div className="iconContainer">{props.icon}</div>
      <h3 className="msg" dangerouslySetInnerHTML={{ __html: props.msg }} />
      <style jsx>{`
        .container {
          padding: 2em;
          text-align: center;
        }
        .msg {
          font-weight: 500;
          color: ${CSSConstants.secondaryTextColor};
        }
        .iconContainer {
          font-size: 2.5rem;
          color: ${CSSConstants.secondaryTextColor};
          opacity: 0.7;
        }
      `}</style>
    </div>
  );
};

EmptyMsg.defaultProps = {
  msg: "Sorry! We couldn't find anything."
};

export default EmptyMsg;
