import { EcosystemDataInterface } from "../../types/business";
import CSSConstants from "../../constants/CSSConstants";

interface EcosystemOptionProps {
  ecosystem: EcosystemDataInterface;
}

const EcosystemOption = (props: EcosystemOptionProps) => {
  const { ecosystem } = props;
  return (
    <span className="ecosystemOptionName">
      <span className="contentContainer">
        <span>{ecosystem.ecosystem_name}</span>
        <span className="ecoUrl">{ecosystem.ecosystem_url[0]}</span>
      </span>
      <span className="iconContainer">
        {ecosystem.mode === "PRIVATE" ? (
          <i className="privateIcon fa fa-lock" aria-hidden="true"></i>
        ) : (
          <i className="publicIcon fas fa-users"></i>
        )}
      </span>
      <style jsx>{`
        .ecosystemOptionName {
          display: inline-flex;
          width: 100%;
          justify-content: space-between;
        }
        .ecosystemOptionName .contentContainer {
          display: flex;
          flex-direction: column;
        }
        .ecoUrl {
          font-size: 0.8rem;
          color: ${CSSConstants.secondaryTextColor};
        }
        .publicIcon {
          color: ${CSSConstants.successColor};
        }
        .privateIcon {
          color: ${CSSConstants.dangerColor};
        }
      `}</style>
    </span>
  );
};

export default EcosystemOption;
