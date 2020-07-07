import * as React from "react";
import classNames from "classnames";
import CSSConstants from "../constants/CSSConstants";
import { useState } from "react";

interface TabSectionProps {
  headingList: string[];
  contentList: React.ReactNode[];
  headingWidth?: string;
}

const TabSection = (props: TabSectionProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabClick = (e, index) => {
    e.preventDefault();
    setActiveIndex(index);
  };

  const headings = props.headingList.map((content, index) => {
    const classes = classNames({
      heading: true,
      headingActive: index === activeIndex,
    });

    return (
      <div key={index} className={classes}>
        <a href="#0" onClick={(e) => handleTabClick(e, index)}>
          {content}
        </a>
        <style jsx>{`
          .headingActive {
            font-weight: bold;
            color: ${CSSConstants.primaryColor};
          }
          .heading {
            width: ${props.headingWidth};
          }
          .heading a {
            display: inline-block;
            padding: 0.9em 1em;
            text-align: center;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            text-decoration: none;
            color: inherit;
          }
        `}</style>
      </div>
    );
  });

  const contents = props.contentList.map((content, index) => {
    const classes = classNames({
      content: true,
      contentActive: index === activeIndex,
    });

    return (
      <div key={index} className={classes}>
        {content}
        <style jsx>{`
          .content {
            flex: 0 0 auto;
            width: 100%;
            transform: translateX(${activeIndex * -100}%);
            transition: all 0.3s;
            will-change: transform, opacity;
            pointer-events: none;
            opacity: 0;
          }
          .contentActive {
            opacity: 1;
            pointer-events: auto;
          }
        `}</style>
      </div>
    );
  });

  const activeLineContainerStyles = {
    transform: `translateX(${100 * activeIndex}%)`,
  };

  return (
    <section className="tabSection">
      <nav className="headingContainer">
        <div className="headings">
          {headings}
          <div
            className="activeLineContainer"
            style={activeLineContainerStyles}
          >
            <hr className="activeLine"></hr>
          </div>
        </div>
      </nav>
      <div className="contentContainer">{contents}</div>
      <style jsx>{`
        .headingContainer {
          box-shadow: 0 1px 3px #00000029;
          display: flex;
        }
        .headings {
          display: flex;
          position: relative;
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .activeLine {
          border: none;
          margin: 0 auto;
          width: 80%;
          height: 0.2em;
          background: ${CSSConstants.primaryColor};
        }
        .activeLineContainer {
          width: ${props.headingWidth};
          position: absolute;
          left: 0;
          bottom: 0;
          transition: transform 0.3s;
        }
        .contentContainer {
          min-width: 500px;
          width: 100%;
          overflow: hidden;
          display: flex;
        }
      `}</style>
    </section>
  );
};
TabSection.defaultProps = {
  headingWidth: "200px",
};

export default TabSection;
