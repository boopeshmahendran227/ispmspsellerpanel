import React from "react";
import NotificationContainer from "../molecules/NotificationContainer";
import {
  Drawer,
  DrawerBody,
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
