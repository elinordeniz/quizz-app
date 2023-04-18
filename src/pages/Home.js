
import { MenuItem, TextField, Button } from "@mui/material";

import useQuiz from "../context/QuizContext";
import Categories from "../data/Categories";
import ErrorMessage from "../components/ErrorMessage";
const Home = () => {
  const {
    name,
    setName,
    category,
    setCategory,
    difficulty,
    setDifficulty,
    handleSubmit,
    error,
  } = useQuiz();

  return (
    <div className="Home">
      <div className="options">
        <span className="title">Quiz Options</span>
        <div className="options-input-area">
          {error && <ErrorMessage>Please fill all the fields</ErrorMessage>}
          <TextField
            label="enter your name"
            variant="outlined"
            value={name}
            style={{ marginBottom: 25 }}
            onChange={(e) => setName(e)}
          />
          <TextField
            select
            label="select category"
            variant="outlined"
            value={category}
            style={{ marginBottom: 30 }}
            onChange={(e) => setCategory(e)}
          >
            {Categories.map((c) => (
              <MenuItem key={c.category} value={c.value}>
                {c.category}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="select difficulty"
            variant="outlined"
            value={difficulty}
            style={{ marginBottom: 30 }}
            onChange={(e) => setDifficulty(e)}
          >
            <MenuItem key="easy" value="easy">
              Easy
            </MenuItem>
            <MenuItem key="medium" value="medium">
              Medium
            </MenuItem>
            <MenuItem key="hard" value="hard">
              Hard
            </MenuItem>
          </TextField>

          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSubmit}
            className="start-button"
          >
            Start Quiz
          </Button>
        </div>
      </div>

      <img src="/logo.png" className="image" alt="quiz img" />
    </div>
  );
};

export default Home;
