import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./Routes/route";
import DefaultLayout from "./Pages/Layout/DefaultLayout/DefaultLayout";
import { Fragment } from "react";
import PageAdmin from "./Components/Admin/PageAdmin";
function App() {
  return (
    <>
      <Router>
        <Routes>
          {publicRoutes.map((route, index) => {
            const Layout = route.layout === null ? Fragment : DefaultLayout;
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
        <Routes>
          {privateRoutes.map((route, index) => {
            const Layout = route.layout === null ? Fragment : PageAdmin;
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </Router>
    </>
  );
}

export default App;
