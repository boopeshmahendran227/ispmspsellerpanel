import { SingleDatePicker } from "react-dates";
import moment from "moment";
import Button from "./Button";
import { useState } from "react";
import { Stack, Box } from "@chakra-ui/core";

interface DatePickerProps {
  onChange: (date: moment.Moment) => void;
  value: moment.Moment;
}

const today = moment();
const tomorrow = moment().add(1, "day");
const presets = [
  {
    text: "Today",
    value: today,
  },
  {
    text: "Tomorrow",
    value: tomorrow,
  },
];

const DatePicker = (props: DatePickerProps) => {
  const renderDatePresets = () => {
    return (
      <Stack isInline spacing={3} m={3} mb={5} p={2}>
        {presets.map(({ text, value }) => {
          const isActive = value.isSame(props.value, "date");

          return (
            <Box>
              <Button
                variant={!isActive ? "outline" : "solid"}
                onClick={() => {
                  props.onChange(value);
                }}
              >
                {text}
              </Button>
            </Box>
          );
        })}
      </Stack>
    );
  };

  const [focused, setFocused] = useState(false);

  return (
    <SingleDatePicker
      date={props.value}
      onDateChange={props.onChange}
      hideKeyboardShortcutsPanel={true}
      renderCalendarInfo={renderDatePresets}
      numberOfMonths={1}
      onFocusChange={({ focused }) => setFocused(focused)}
      focused={focused}
      small={true}
      block={true}
    />
  );
};

export default DatePicker;
