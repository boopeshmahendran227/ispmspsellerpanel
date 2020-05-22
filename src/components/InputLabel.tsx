interface InputLabelProps {
  label: string;
}

const InputLabel = (props: InputLabelProps) => {
  return (
    <div className="label">
      {props.label} :
      <style jsx>{`
        .label {
          display: inline-block;
          margin: 0.6em 0;
          font-weight: 500;
          min-width: 200px;
          text-align: right;
        }
      `}</style>
    </div>
  );
};

export default InputLabel;
