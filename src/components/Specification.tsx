import { SpecificationInterface } from "../types/product";
import CSSConstants from "../constants/CSSConstants";

interface SpecificationProps {
  specification: SpecificationInterface;
}

const Specification = (props: SpecificationProps) => {
  const { specification } = props;

  return (
    <div className="container">
      <header>Specification</header>
      <div className="body">
        {specification.itemGroups.map((group, groupIndex) => (
          <div className="specGroupContainer">
            <div className="groupName">
              <div className="key">Group Name: </div>
              <div className="value">{group.name}</div>
            </div>
            {group.items.length > 0 && (
              <table className="specTable">
                <thead>
                  <tr>
                    <th>S.no</th>
                    <th>Key</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {group.items.map((item, itemIndex) => (
                    <tr>
                      <td>{itemIndex + 1}</td>
                      <td>{item.key}</td>
                      <td>{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ))}
      </div>
      <style jsx>{`
        .container {
          margin: 3em 0;
          font-size: 1.1rem;
        }
        header {
          font-weight: bold;
          font-size: 1.3rem;
          border-bottom: 1px solid ${CSSConstants.borderColor};
          padding: 0.3em;
          margin-bottom: 1em;
        }
        .body {
          margin: 0.5em 2em;
        }
        .groupName {
          display: grid;
          grid-template-columns: 100px 300px;
        }
        .groupName .key {
          font-weight: bold;
        }
        .specTable {
          margin: 0.5em 0;
        }
      `}</style>
    </div>
  );
};

export default Specification;
