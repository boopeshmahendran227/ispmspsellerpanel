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
      my={2}
      p={3}
      bg="white"
      templateColumns="50px auto"
      borderBottom="1px"
      borderColor="borderColor.500"
      boxShadow="md"
    >
      <Box fontSize="md">
        <i className="far fa-envelope"></i>
      </Box>
      <Box>
        <Heading size="md">{props.notification.subject}</Heading>
        <Box mb="md">{props.notification.message}</Box>
        <Box color="gray" fontSize="sm">
          {moment.utc(props.notification.createdDateTime).local().fromNow()}
        </Box>
      </Box>
    </Grid>
  );
};

export default NotificationCard;
