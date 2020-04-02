/**
 * Copied from https://stackoverflow.com/questions/53262263/target-active-link-when-the-route-is-active-in-next-js
 */

import Link from "next/link";
import React, { Children } from "react";
import { useRouter } from "next/router";

interface ActiveLinkProps {
  children: any;
  href: string;
  highLightRoutes?: string[];
  activeClassName?: string;
}

const ActiveLink = ({
  children,
  highLightRoutes,
  ...props
}: ActiveLinkProps) => {
  const router = useRouter();

  const child = Children.only(children);

  let className = child.props.className || null;

  let activePath = router.pathname;
  // Remove the last param from path
  // For ex: convert /customer/1 to /customer
  if (activePath.indexOf("/") !== activePath.lastIndexOf("/")) {
    activePath = activePath.slice(0, activePath.lastIndexOf("/"));
  }

  const routes = [...highLightRoutes, props.href];

  if (routes.includes(activePath) && props.activeClassName) {
    className = `${className !== null ? className : ""} ${
      props.activeClassName
    }`.trim();
  }

  delete props.activeClassName;

  return <Link {...props}>{React.cloneElement(child, { className })}</Link>;
};

ActiveLink.defaultProps = {
  highLightRoutes: []
};

export default ActiveLink;
