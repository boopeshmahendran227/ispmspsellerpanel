import CSSConstants from "../../constants/CSSConstants";
import _ from "lodash";
import moment from "moment";
import { NotificationItemInterface } from "../../types/notification";
import { Box, Grid, Heading } from "@chakra-ui/core";

interface NotificationCardProps {
  notification: NotificationItemInterface;
}

const NotificationCard = (props: NotificationCardProps) => {
  return (
    <Grid
      margin="0.5em 0"
      p="1em"
      bg="white"
      templateColumns="50px auto"
      borderBottom={CSSConstants.borderStyle}
      boxShadow="0 1px 3px rgba(0, 0, 0, 0.12),0 1px 2px rgba(0, 0, 0, 0.24)"
    >
      <Box fontSize="1.9rem">
        <i className="far fa-envelope"></i>
      </Box>
      <Box>
        <Heading size="md">{props.notification.subject}</Heading>
        <Box mb="0.4em">{props.notification.message}</Box>
        <Box color="gray" fontSize="0.9em">
          {moment.utc(props.notification.createdDateTime).local().fromNow()}
        </Box>
      </Box>
    </Grid>
  );
};

export default NotificationCard;
