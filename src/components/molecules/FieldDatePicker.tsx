import { Field, ErrorMessage } from "formik";
import ValidationErrorMsg from "../atoms/ValidationErrorMsg";
import DatePicker from "../atoms/DatePicker";

interface FieldDatePickerProps {
  name: string;
}

const FieldDatePicker = (props: FieldDatePickerProps) => {
  return (
    <Field name={props.name}>
      {({ field }) => (
        <span className="container">
          <DatePicker
            value={field.value}
            onChange={(value) => {
              field.onChange({
                target: { name: field.name, value },
              });
            }}
          />
          <ErrorMessage component={ValidationErrorMsg} name={field.name} />
          <style jsx>{`
            .container {
              margin: 0.3em 0;
            }
          `}</style>
        </span>
      )}
    </Field>
  );
};

export default FieldDatePicker;
