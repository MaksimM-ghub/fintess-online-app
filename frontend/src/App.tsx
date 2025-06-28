import "normalize.css";
import "./styles/main.scss";
import Header from "./components/Header/Header";
import CalcCalorie from "./components/CalcCalories/CalcCalories";
import { Routes, Route } from "react-router-dom";
import HeroBlock from "./components/HeroBlock/HeroBlock";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HeroBlock />} />
          <Route path="/calorie-calculation" element={<CalcCalorie />} />
        </Routes>
      </main>
      <footer className="footer">
        <div className="container footer__container"></div>
      </footer>
    </>
  );
}

export default App;
