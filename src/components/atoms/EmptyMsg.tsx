import CSSConstants from "../../constants/CSSConstants";
import { Box } from "@chakra-ui/core";

interface EmptyMsgProps {
  icon?: React.ReactNode;
  msg: string;
}

const EmptyMsg = (props: EmptyMsgProps) => {
  return (
    <Box p="2em" textAlign="center">
      <Box
        fontSize="2.5rem"
        color={CSSConstants.secondaryTextColor}
        opacity={0.7}
      >
        {props.icon}
      </Box>
      <h3 className="msg" dangerouslySetInnerHTML={{ __html: props.msg }} />
      <style jsx>{`
        .msg {
          font-weight: 500;
          color: ${CSSConstants.secondaryTextColor};
        }
      `}</style>
    </Box>
  );
};

EmptyMsg.defaultProps = {
  msg: "Sorry! We couldn't find anything.",
};

export default EmptyMsg;
