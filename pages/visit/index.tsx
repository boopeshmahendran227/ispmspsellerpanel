import * as React from "react";
import moment from "moment";
import SingleDatePicker from "components/atoms/SingleDatePicker";
import RadioButton from "components/atoms/RadioButton";
import _ from "lodash";
import { ShowroomInterface, ShowroomVisitInterface } from "types/showroomVisit";
import WithAuth from "components/atoms/WithAuth";
import useSWR from "swr";
import { useState } from "react";
import PageError from "components/atoms/PageError";
import Loader from "components/atoms/Loader";
import ShowroomVisitsContainer from "components/molecules/ShowroomVisitsContainer";
import PageHeaderContainer from "components/atoms/PageHeaderContainer";
import PageHeader from "components/atoms/PageHeader";
import { Box, Grid, Heading, Divider } from "@chakra-ui/core";

const ShowroomVisits = () => {
  const [showroomFilter, setShowroomFilter] = useState(null);
  const [dateFilter, setDateFilter] = useState(moment());

  const showroomVisitsSWR = useSWR<ShowroomVisitInterface[]>(
    `/showroom/seller?showroomId=${showroomFilter}&date=${moment(dateFilter)
      .utc()
      .format("YYYY-MM-DD")}`
  );
  const showroomSWR = useSWR<ShowroomInterface[]>("/showroom/short");

  const showrooms: ShowroomInterface[] | undefined = showroomSWR.data;
  const showroomVisits: ShowroomVisitInterface[] | undefined =
    showroomVisitsSWR.data;
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
    <Grid templateColumns="1fr auto" gap={2} p={5} maxW="1200px" m="auto">
      <Box>
        <PageHeaderContainer>
          <PageHeader>Showroom Visits</PageHeader>
        </PageHeaderContainer>
        <ShowroomVisitsContainer
          showroomVisits={showroomVisits}
          dateFilter={dateFilter}
        />
      </Box>
      <Box>
        <SingleDatePicker onChange={handleDateChange} value={dateFilter} />
        <Box
          bg="white"
          boxShadow="md"
          borderRadius="md"
          className="showroomFilterContainer"
        >
          <Heading size="sm" py={2} px={4}>
            Showrooms
          </Heading>
          <Divider />
          <Box py={2} px={4}>
            <Box>
              <RadioButton
                label="All Showrooms"
                value={""}
                checked={showroomFilter === null}
                onChange={handleShowroomChange}
              />
            </Box>
            {showrooms.map((showroom, index) => (
              <Box key={index}>
                <RadioButton
                  key={index}
                  label={showroom.name}
                  value={showroom.id}
                  checked={showroomFilter === showroom.id}
                  onChange={handleShowroomChange}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default WithAuth(ShowroomVisits);
