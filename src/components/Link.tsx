/**
 * Copied from https://stackoverflow.com/questions/53262263/target-active-link-when-the-route-is-active-in-next-js
 */

import Link from "next/link";
import React, { Children } from "react";
import { useRouter } from "next/router";

interface ActiveLinkProps {
  children: any;
  href: string;
  matchFunc?: (route: string) => boolean;
  activeClassName?: string;
}

const ActiveLink = ({ children, matchFunc, ...props }: ActiveLinkProps) => {
  const router = useRouter();

  const child = Children.only(children);

  let className = child.props.className || null;

  const activePath = router.pathname;

  if (
    activePath === props.href ||
    (matchFunc && matchFunc(activePath) && props.activeClassName)
  ) {
    className = `${className !== null ? className : ""} ${
      props.activeClassName
    }`.trim();
  }

  delete props.activeClassName;

  return <Link {...props}>{React.cloneElement(child, { className })}</Link>;
};

export default ActiveLink;
