import useQuiz from "../context/QuizContext";
import { Button } from "@mui/material";
import ErrorMessage from "./ErrorMessage";

const Question = () => {
  const {
    currentQuestion,
    questions,
    options,
    handleSelect,
    handleCheck,
    handleQuit,
    handleNext,
    questionError,
    selected,
  } = useQuiz();

  return (
    <div className="Question" >
      <div className="title">
        <h1>Question {currentQuestion + 1}</h1>
      </div>
      <div className="question-body">
        <h2
          dangerouslySetInnerHTML={{
            __html: questions[currentQuestion]?.question,
          }}
        ></h2>
        <div className="options">
          {questionError && <ErrorMessage>{questionError}</ErrorMessage>}
          {options?.map((op) => (
            <button
              className={`option ${selected && handleSelect(op)}`}
              key={op}
              disabled={selected}
              onClick={() => handleCheck(op)}
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: op,
                }}
              ></span>
            </button>
          ))}
        </div>
        <div className="controls">
          <Button
            variant="contained"
            color="secondary"
            size="large"
            href="/"
            onClick={handleQuit}
            className="quit"
          >
            Quit
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleNext}
            className="next"
          >
            Next Question
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Question;
