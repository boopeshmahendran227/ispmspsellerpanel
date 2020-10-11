import { Box, Heading } from "@chakra-ui/core";

interface EmptyMsgProps {
  icon?: React.ReactNode;
  msg: string;
}

const EmptyMsg = (props: EmptyMsgProps) => {
  return (
    <Box p={2} textAlign="center">
      <Box fontSize="xl" color="secondaryTextColor" opacity={0.7}>
        {props.icon}
      </Box>
      <Heading
        size="sm"
        fontWeight="semibold"
        color="secondaryTextColor"
        dangerouslySetInnerHTML={{ __html: props.msg }}
      />
    </Box>
  );
};

EmptyMsg.defaultProps = {
  msg: "Sorry! We couldn't find anything.",
};

export default EmptyMsg;
