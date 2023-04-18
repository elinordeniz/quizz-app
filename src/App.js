import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import ProviderLayout from "./pages/ProviderLayout";

function App() {
  return (
    <div className="App">
      <Header />

      <main>
        <Routes>
          <Route element={<ProviderLayout />}>
            <Route path="*" element={<Home />} />
            <Route path="/" exact element={<Home />} />

            <Route path="/quiz" element={<Quiz />} />

            <Route path="/result" element={<Result />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
