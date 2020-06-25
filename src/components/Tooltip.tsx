import React from "react";
import TooltipTrigger from "react-popper-tooltip";

const Tooltip = ({ children, tooltip, ...props }) => (
  <TooltipTrigger
    {...props}
    tooltip={({
      arrowRef,
      tooltipRef,
      getArrowProps,
      getTooltipProps,
      placement = "right",
    }) => (
      <div
        {...getTooltipProps({
          ref: tooltipRef,
          className: "tooltip-container",
        })}
      >
        <div
          {...getArrowProps({
            ref: arrowRef,
            className: "tooltip-arrow",
            "data-placement": placement,
          })}
        />
        {tooltip}
      </div>
    )}
  >
    {({ getTriggerProps, triggerRef }) => (
      <span
        {...getTriggerProps({
          ref: triggerRef,
          className: "trigger",
        })}
      >
        {children}
      </span>
    )}
  </TooltipTrigger>
);

export default Tooltip;
