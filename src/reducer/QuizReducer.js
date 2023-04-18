export const initialState = {
  questions: null,
  category: "",
  difficulty: "",
  error: null,
  name: "",
  question: "",
  score: 0,
  selected: "",
  questionError: null,
  options: [],
  currentQuestion: 0,
};

const QuizReducer = (state, action) => {
  switch (action.type) {
    case "SET_OPTIONS":
      return {
        ...state,
        options: action.payload.options,
      };

    case "SET_CURRENT_QUESTIONS":
      return {
        ...state,
        currentQuestion: action.payload.currentQuestion,
      };

    case "SET_QUESTIONS":
      return {
        ...state,
        questions: action.payload.questions,
      };

    case "SET_CATEGORY":
      return {
        ...state,
        category: action.payload.category,
      };

    case "SET_DIFFICULTY":
      return {
        ...state,
        difficulty: action.payload.difficulty,
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload.error,
      };
    case "SET_NAME":
      return {
        ...state,
        name: action.payload.name,
      };
    case "SET_QUESTION":
      return {
        ...state,
        question: action.payload.question,
      };
    case "SET_SCORE":
      return {
        ...state,
        score: state.score + 100,
      };
    case "SET_SELECTED":
      return {
        ...state,
        selected: action.payload.selected,
      };
    case "SET_QUESTION_ERROR":
      return {
        ...state,
        questionError: action.payload.questionError,
      };

    default: {
      throw new Error("Err in reducer!");
    }
  }
};

export default QuizReducer;
