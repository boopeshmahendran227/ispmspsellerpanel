import { DayPickerSingleDateController } from "react-dates";
import moment from "moment";
import BorderButton from "./BorderButton";

interface SingleDatePickerProps {
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

const SingleDatePicker = (props: SingleDatePickerProps) => {
  const renderDatePresets = () => {
    return (
      <div className="buttonPanel">
        {presets.map(({ text, value }) => {
          const isActive = value.isSame(props.value, "date");

          return (
            <BorderButton
              isActive={isActive}
              onClick={() => {
                props.onChange(value);
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
    <DayPickerSingleDateController
      focused={true}
      date={props.value}
      onDateChange={props.onChange}
      hideKeyboardShortcutsPanel={true}
      renderCalendarInfo={renderDatePresets}
      isOutsideRange={(day) => day.diff(moment(), "days") < 0}
      numberOfMonths={1}
    />
  );
};

export default SingleDatePicker;