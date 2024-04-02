import "./App.css";
import DetailProduct from "./Components/DetailProduct/DetailProduct";
import LayoutDefault from "./Components/Common/LayoutDefault/LayoutDefault";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Page from "./Pages/Page";
function App() {
  return (
    <>
      <Router>
        {/* <LayoutDefault />  */}
        <Routes>
          <Route path="/" element={<Page />} />
          <Route path="/detailproduct" element={<DetailProduct />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
