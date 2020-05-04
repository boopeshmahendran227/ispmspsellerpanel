import { DayPickerRangeController } from "react-dates";
import { useState } from "react";
import moment from "moment";
import BorderButton from "../components/BorderButton";
import { DateRangeFilterInterface } from "../types/showroomVisit";

interface DateRangePickerProps {
  onDatesChange: (dateRange: DateRangeFilterInterface) => void;
  startDate: moment.Moment;
  endDate: moment.Moment;
}

const today = moment();
const tomorrow = moment().add(1, "day");
const presets = [
  {
    text: "Today",
    start: today,
    end: today,
  },
  {
    text: "Tomorrow",
    start: tomorrow,
    end: tomorrow,
  },
  {
    text: "Next Week",
    start: today,
    end: moment().add(1, "week"),
  },
];

const DateRangePicker = (props: DateRangePickerProps) => {
  const [focusedInput, setFocusedInput] = useState("startDate");

  const onFocusChange = (focusedInput) => {
    // Force the focusedInput to always be truthy so that dates are always selectable
    setFocusedInput(!focusedInput ? "startDate" : focusedInput);
  };

  const renderDatePresets = () => {
    return (
      <div className="buttonPanel">
        {presets.map(({ text, start, end }) => {
          const isActive =
            start.isSame(props.startDate, "date") &&
            end.isSame(props.endDate, "date");
          return (
            <BorderButton
              isActive={isActive}
              onClick={() => {
                props.onDatesChange({ startDate: start, endDate: end });
              }}
            >
              {text}
            </BorderButton>
          );
        })}
        <style jsx>{`
          .buttonPanel {
            padding: 0.6em;
          }
        `}</style>
      </div>
    );
  };

  return (
    <DayPickerRangeController
      onDatesChange={props.onDatesChange}
      onFocusChange={onFocusChange}
      focusedInput={focusedInput}
      startDate={props.startDate}
      endDate={props.endDate}
      renderCalendarInfo={renderDatePresets}
      hideKeyboardShortcutsPanel={true}
    />
  );
};

export default DateRangePicker;
