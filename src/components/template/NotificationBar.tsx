import React from "react";
import classNames from "classnames";
import CSSConstants from "../../constants/CSSConstants";
import NotificationContainer from "../molecules/NotificationContainer";

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/core";

interface NotificationBarProps {
  open: boolean;
  onClose: () => void;
}

const NotificationBar = (props: NotificationBarProps) => {
  const blockClicks = (e) => {
    e.stopPropagation();
  };

  const classes = classNames({
    sideNavBar: true,
    sideNavBarVisible: props.open,
  });

  return (
    <Drawer isOpen={props.open} placement="right" onClose={props.onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>Notifications</DrawerHeader>
        <DrawerCloseButton />
        <DrawerBody>
          <NotificationContainer />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default NotificationBar;
