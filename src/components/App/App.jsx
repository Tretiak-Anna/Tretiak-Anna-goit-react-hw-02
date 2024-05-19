import { useState, useEffect } from "react";
import Description from "../Description/Description";
import Feedback from "../Feedback/Feedback";
import Options from "../Options/Options";
import Notification from "../Notification/Notification";
import "./App.css";

export default function App() {
  const initFeedback = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  const [feedbackCount, setFeedbackCount] = useState(() => {
    const savedFeedbackCount = window.localStorage.getItem("feedback");
    if (savedFeedbackCount !== null) {
      return JSON.parse(savedFeedbackCount);
    } else {
      return initFeedback;
    }
  });

  useEffect(() => {
    window.localStorage.setItem("feedback", JSON.stringify(feedbackCount));
  }, [feedbackCount]);

  const updateFeedback = (feedbackType) => {
    setFeedbackCount((prevFeedback) => ({
      ...prevFeedback,
      [feedbackType]: prevFeedback[feedbackType] + 1,
    }));
  };

  const totalFeedback =
    feedbackCount.good + feedbackCount.neutral + feedbackCount.bad;

  const positiveFeedback = Math.round(
    (feedbackCount.good / totalFeedback) * 100
  );

  return (
    <div>
      <Description />
      <Options
        updateFeedback={updateFeedback}
        total={totalFeedback}
        resetFeedback={setFeedbackCount}
        initFeedback={initFeedback}
      />
      {totalFeedback !== 0 ? (
        <Feedback
          value={feedbackCount}
          total={totalFeedback}
          positive={positiveFeedback}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
}
