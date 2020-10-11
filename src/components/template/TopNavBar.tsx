import CSSConstants from "../../constants/CSSConstants";
import moment from "moment";
import { useState, useEffect } from "react";
import NotificationBar from "./NotificationBar";
import { connect } from "react-redux";
import { RootState } from "../../reducers";
import { getUnreadNotificationCount } from "../../selectors/notification";
import NotificationActions from "../../actions/notification";
import LoginActions from "../../actions/login";
import Logo from "../atoms/Logo";
import { Box, Flex, Link } from "@chakra-ui/core";

interface StateProps {
  unreadNotificationCount: number;
}

interface DispatchProps {
  clearUnreadNotificationCount: () => void;
  logout: () => void;
}

type TopNavBarProps = StateProps & DispatchProps;

const TopNavBar = (props: TopNavBarProps) => {
  const [time, setTime] = useState(moment());
  const [notificationBarOpen, setNotificationBarOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(moment());
    }, 60 * 1000);
    return () => clearInterval(timer);
  });

  const handleNotificationClick = () => {
    props.clearUnreadNotificationCount();
    setNotificationBarOpen(true);
  };

  const handleLogout = () => {
    props.logout();
  };

  return (
    <Box height={"60px"} className="container">
      <Flex
        height="60px"
        px={5}
        py={2}
        position="fixed"
        top="0"
        left="0"
        zIndex={10}
        alignItems="center"
        right="0"
        bg="foregroundColor"
        boxShadow="md"
        className="fixedContainer"
      >
        <Box flex="1" className="logoContainer">
          <Logo />
        </Box>
        <Link
          fontSize="md"
          mx={4}
          position="relative"
          cursor="pointer"
          key={
            props.unreadNotificationCount
          } /* Retrigger animation when count changes */
          onClick={handleNotificationClick}
        >
          <i className="fas fa-bell"></i>
          {Boolean(props.unreadNotificationCount) && (
            <Box
              as="span"
              position="absolute"
              top="0"
              right="0"
              borderRadius="full"
              bg="dangerColor"
              color="foregroundColor"
              w={2}
              h={2}
              lineHeight={2}
              fontSize="sm"
              textAlign="center"
              transform="translate(30%, -30%)"
            >
              {props.unreadNotificationCount}
            </Box>
          )}
        </Link>
        <Box>
          <i className="far fa-clock" aria-hidden={true}></i>
          <Box as="span" display="inline-block" className="time">
            {time.format("MMM D, hh:mm a")}
          </Box>
        </Box>
        <Box mx={3}>
          <Link onClick={handleLogout}>
            <i className="fas fa-sign-out-alt" aria-hidden={true}></i> Logout
          </Link>
        </Box>
        <NotificationBar
          open={notificationBarOpen}
          onClose={() => setNotificationBarOpen(false)}
        />
      </Flex>
    </Box>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  unreadNotificationCount: getUnreadNotificationCount(state),
});

const mapDispatchToProps: DispatchProps = {
  clearUnreadNotificationCount:
    NotificationActions.clearUnreadNotificationCount,
  logout: LoginActions.logout,
};

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(TopNavBar);
