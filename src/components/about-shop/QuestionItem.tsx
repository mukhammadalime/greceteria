import { useState } from "react";

const QuestionItem = ({
  question,
  answer,
}: {
  question: string;
  answer: any;
}) => {
  const [answerShown, setAnswerShown] = useState(() => false);
  let updatedAnswer = answer;
  if (answer.includes("*")) {
    updatedAnswer = (
      <>
        <p>{answer.split("*")[0]}</p>
        <br />
        <p>*{answer.split("*")[1]}</p>
      </>
    );
  }

  return (
    <div
      className={`question ${answerShown && "answer-open"}`}
      onClick={() => setAnswerShown(!answerShown)}
    >
      {question}
      <img src="/assets/icons/arrow-down-icon.svg" alt="" />
      <div className="answer">{updatedAnswer}</div>
    </div>
  );
};

export default QuestionItem;
