import * as React from "react";
import moment from "moment";
import SingleDatePicker from "components/SingleDatePicker";
import RadioButton from "components/RadioButton";
import CSSConstants from "../../src/constants/CSSConstants";
import _ from "lodash";
import { ShowroomInterface, ShowroomVisitInterface } from "types/showroomVisit";
import WithAuth from "components/WithAuth";
import useSWR from "swr";
import { useState } from "react";
import PageError from "components/PageError";
import Loader from "components/Loader";
import ShowroomVisitsContainer from "components/ShowroomVisitsContainer";

const ShowroomVisits = () => {
  const [showroomFilter, setShowroomFilter] = useState(null);
  const [dateFilter, setDateFilter] = useState(moment());

  const showroomVisitsSWR = useSWR(
    `/showroom/seller?showroomId=${showroomFilter}&date=${moment(dateFilter)
      .utc()
      .format("YYYY-MM-DD")}`
  );
  const showroomSWR = useSWR("/showroom/short");

  const showrooms: ShowroomInterface[] = showroomSWR.data;
  const showroomVisits: ShowroomVisitInterface[] = showroomVisitsSWR.data;
  const error = showroomVisitsSWR.error || showroomSWR.error;

  if (error) {
    return <PageError statusCode={error.response?.status} />;
  }

  if (!showrooms) {
    return <Loader />;
  }

  const handleDateChange = (date) => {
    setDateFilter(date);
  };

  const handleShowroomChange = (value) => {
    setShowroomFilter(value || null);
  };

  return (
    <div className="container">
      <div className="showroomVisitsContainer">
        <h1>Showroom Visits</h1>
        <ShowroomVisitsContainer
          showroomVisits={showroomVisits}
          dateFilter={dateFilter}
        />
      </div>
      <div className="filterContainer">
        <SingleDatePicker onChange={handleDateChange} value={dateFilter} />

        <div className="showroomFilterContainer">
          <header>Showrooms</header>
          <div className="body">
            <div>
              <RadioButton
                label="All Showrooms"
                value={null}
                checked={showroomFilter === null}
                onChange={handleShowroomChange}
              />
            </div>
            {showrooms.map((showroom, index) => (
              <div key={index}>
                <RadioButton
                  key={index}
                  label={showroom.name}
                  value={showroom.id}
                  checked={showroomFilter === showroom.id}
                  onChange={handleShowroomChange}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr auto;
          grid-gap: 5em;
          padding: 2em;
          max-width: 1200px;
          margin: auto;
        }
        .showroomFilterContainer {
          background: white;
          margin-top: 2em;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05),
            0 0 0 1px rgba(0, 0, 0, 0.07);
          border-radius: 0.2em;
        }
        .showroomFilterContainer header {
          font-weight: bold;
          border-bottom: 1px solid ${CSSConstants.disabledColor};
        }
        .showroomFilterContainer header,
        .showroomFilterContainer .body {
          padding: 0.8em 1.7em;
        }
        .filterContainer {
          padding: 2em;
        }
      `}</style>
    </div>
  );
};

export default WithAuth(ShowroomVisits);
