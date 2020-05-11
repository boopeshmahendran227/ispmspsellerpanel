import { useState } from "react";
import classNames from "classnames";
import CSSConstants from "../constants/CSSConstants";

interface FeedbackProps {
  orderId: number;
}

enum SubmitState {
  NotStarted,
  InProgress,
  Success,
  Error,
}

const smileys = ["hate", "dislike", "like", "love", "wow"];

const getFeedbackText = (submitState: SubmitState) => {
  switch (submitState) {
    case SubmitState.NotStarted:
      return "Please provide your feedback. <br/> We are listening!!";
    case SubmitState.InProgress:
      return "Loading....";
    case SubmitState.Success:
      return "Thanks for providing your feedback! <br/> Have a great day.";
    case SubmitState.Error:
      return "Sorry, something went wrong. <br/> Please try submitting again";
  }
  return "";
};

const Feedback = (props: FeedbackProps) => {
  const [currentRating, setCurrentRating] = useState(5);
  const [message, setMessage] = useState("");
  const [submitState, setSubmitState] = useState(SubmitState.NotStarted);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitState(SubmitState.InProgress);
    setTimeout(() => {
      // We always display success as of now
      // in order to not frustrate the customer
      setSubmitState(SubmitState.Success);
    }, 800);
  };

  const handleTextAreaChange = (e) => {
    setMessage(e.target.value);
  };

  const feedbackText = getFeedbackText(submitState);

  const textAreaClasses = classNames({
    textAreaContainer: true,
    open: Boolean(currentRating),
  });

  const formClasses = classNames({
    open:
      submitState === SubmitState.NotStarted ||
      submitState === SubmitState.Error,
  });

  return (
    <section className="container">
      <p
        className="feedbackText"
        dangerouslySetInnerHTML={{ __html: feedbackText }}
      />
      <form onSubmit={handleSubmit} className={formClasses}>
        <div>
          {smileys.map((name, index) => {
            const rating = index + 1;
            const classes = classNames({
              smiley: true,
              active: currentRating === rating,
            });

            return (
              <a
                key={index}
                onClick={() => setCurrentRating(rating)}
                className={classes}
              >
                <img src={`/icons/${name}.svg`} />
                <label>{name}</label>
              </a>
            );
          })}
        </div>
        <section className={textAreaClasses}>
          <div>
            <textarea
              value={message}
              onChange={handleTextAreaChange}
              rows={4}
              placeholder="Tell us more about your experience"
            />
          </div>
          <button type="submit">Submit</button>
        </section>
      </form>
      <style jsx>{`
        .container {
          text-align: center;
          padding: 1em 1.5em;
          margin-top: 2em;
        }
        .feedbackText {
          font-size: 1.2rem;
          color: #666666;
          font-weight: bold;
        }
        .smiley {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          margin: 0 5px;
          opacity: 0.3;
          padding-top: 0.3em;
          transition: all 0.3s;
        }
        .smiley img {
          width: 2.2rem;
          height: auto;
        }
        .smiley.active {
          opacity: 1;
        }
        .smiley.active img {
          transform: scale(1.2);
        }
        .smiley.active::after {
          content: "";
          display: inline-block;
          width: 1px;
          height: 1px;
          border-left: 0.5rem solid transparent;
          border-right: 0.5rem solid transparent;
          border-bottom: 0.6rem solid #7f8184;
        }
        form {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        form,
        .textAreaContainer {
          max-height: 0;
          overflow: hidden;
          transition: all 0.35s;
        }
        form.open,
        .textAreaContainer.open {
          max-height: 1000vh;
        }
        textarea {
          border: 2px solid #7f8184;
          border-radius: 7px;
          padding: 10px;
          box-sizing: border-box;
          outline: none;
          margin: 0;
          resize: none;
          width: 100%;
          max-width: 500px;
        }
        button {
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12),
            0 1px 2px rgba(0, 0, 0, 0.24);
          padding: 0.5em 1em;
          margin: 0.3em;
          text-transform: uppercase;
          font-weight: bold;
          background-color: ${CSSConstants.successColor};
          color: white;
        }
      `}</style>
    </section>
  );
};

export default Feedback;
