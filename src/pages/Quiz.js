import { CircularProgress } from "@mui/material";
import Question from "../components/Question";
import useQuiz from "../context/QuizContext";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const { name, score, questions, currentQuestion } = useQuiz();
  const navigate=useNavigate();



      
 
  return (
    <div className="Quiz">
      <span className="subtitle">Welcome, {name}</span>
      {!questions && <CircularProgress className="CircularProgress" />}
      {questions ? (
        <>
          <div className="info">
            <span className="infos category">
              {questions[currentQuestion]?.category}
            </span>
            <span className="infos score">
              Score: <span className="num">{score}</span>
            </span>
          </div>
          <Question />
        </>
      ) : (
        setTimeout(() => {
          if (!questions) {
            !name && navigate("/");
          }
        }, 2000)
      )}
    </div>
  );
};

export default Quiz;
