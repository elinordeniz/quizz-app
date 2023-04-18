import { useContext, createContext, useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QuizReducer, { initialState } from "../reducer/QuizReducer";
import axios from "axios";
import useSound from "use-sound";
import correctsound from "../sounds/correct.mp3";
import play from "../sounds/play.mp3";
import wrong from "../sounds/wrong.mp3";

const QuizContext = createContext(initialState);

export const QuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(QuizReducer, initialState);
  const {
    name,
    question,
    score,
    category,
    difficulty,
    error,
    selected,
    questionError,
    questions,
    currentQuestion,
    options,
  } = state;
  const navigate = useNavigate();

  const [startGame] = useSound(play);
  const [correctAnswer] = useSound(correctsound);
  const [wrongAnswer] = useSound(wrong);
  const fetchQuestions = async (category = "", difficulty = "") => {
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=10${
        category && `&category=${category}`
      }${difficulty && `&difficulty=${difficulty}`}&type=multiple`
    );
    dispatch({
      type: "SET_QUESTIONS",
      payload: {
        questions: data.results,
      },
    });
  };

  const handleSubmit = () => {
    if (!category || !difficulty || !name) {
      dispatch({
        type: "SET_ERROR",
        payload: {
          error: true,
        },
      });
      return;
    } else {
      dispatch({
        type: "SET_ERROR",
        payload: {
          error: false,
        },
      });
      fetchQuestions(category, difficulty);
      startGame();
      navigate("/quiz");
    }
  }

  const setName = (e) => {
    dispatch({
      type: "SET_NAME",
      payload: {
        name: e.target.value,
      },
    });
  };

  const setCategory = (e) => {
    dispatch({
      type: "SET_CATEGORY",
      payload: {
        category: e.target.value,
      },
    });
  };

  const setDifficulty = (e) => {
    dispatch({
      type: "SET_DIFFICULTY",
      payload: {
        difficulty: e.target.value,
      },
    });
  };

  const handleSelect = (option) => {
    const correct = questions[currentQuestion]?.correct_answer;

    if (selected === option && selected === correct) {
      return "select";
    } else if (selected === option && selected !== correct) {
      return "wrong";
    } else if (option === correct) {
      return "select";
    }
  };

  const handleCheck = (option) => {
    const correct = questions[currentQuestion]?.correct_answer;

    dispatch({
      type: "SET_SELECTED",
      payload: {
        selected: option,
      },
    });
    if (option === correct) {
      correctAnswer();
      dispatch({ type: "SET_SCORE" });
    } else {
      wrongAnswer();
    }
    dispatch({
      type: "SET_QUESTION_ERROR",
      payload: {
        questionError: false,
      },
    });
  };

  const handleQuit = () => {
    navigate("/");
  };

  const handleNext = () => {
    if (currentQuestion > 8) {
      navigate("/result");
    } else if (selected) {
      dispatch({
        type: "SET_CURRENT_QUESTIONS",
        payload: {
          currentQuestion: currentQuestion + 1,
        },
      });

      dispatch({
        type: "SET_SELECTED",
        payload: {
          selected: "",
        },
      });
    } else {
      dispatch({
        type: "SET_QUESTION_ERROR",
        payload: {
          questionError: "Please select an option first",
        },
      });
    }
  };

  const handleShuffle = (optionxs) => {
    return optionxs.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    let op =
      questions &&
      handleShuffle([
        questions[currentQuestion]?.correct_answer,
        ...questions[currentQuestion]?.incorrect_answers,
      ]);
    questions &&
      dispatch({
        type: "SET_OPTIONS",
        payload: {
          options: op,
        },
      });
  }, [questions, currentQuestion]);


  const values = {
    name,
    question,
    score,
    category,
    difficulty,
    error,
    currentQuestion,
    options,
    questions,
    selected,
    questionError,
    fetchQuestions,
    startGame,
    correctAnswer,
    wrongAnswer,
    handleSubmit,
    setName,
    setCategory,
    setDifficulty,
    handleSelect,
    handleCheck,
    handleQuit,
    handleNext
  };
  return <QuizContext.Provider value={values}>{children}</QuizContext.Provider>;
};

const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("Error context");
  }

  return context;
};

export default useQuiz;
