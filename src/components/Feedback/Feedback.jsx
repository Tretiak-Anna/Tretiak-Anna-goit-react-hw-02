import "./Feedback.css";

export default function Feedback({ value, total, positive }) {
  return (
    <ul>
      <p>Good: {value.good}</p>
      <p>Neutral: {value.neutral}</p>
      <p>Bad: {value.bad}</p>
      <p>Total: {total}</p>
      <p>Positive: {positive}%</p>
    </ul>
  );
}
