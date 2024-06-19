import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateProject from "./pages/CreateProject";
import Projects from "./pages/Projects";
import Project from "./pages/Project";
import CreateTask from "./pages/CreateTask";
import Snackbar from "./components/Snackbar";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { Suspense, lazy } from "react";
const ViewTask = lazy(() => import("./pages/ViewTask"));

function App() {
  return (
    <div className="App">
      <Suspense fallback="...loading">
        <Snackbar />
        <Router>
          <Routes>
            <Route path="projects/create/:step" element={<CreateProject />} />
            <Route path="projects" element={<Projects />} />
            <Route path="project/:uuid" element={<Project />} />
            <Route path="project/:uuid/task/:taskUuid" element={<ViewTask />} />
            <Route
              path="project/:uuid/column/:columnUuid"
              element={<CreateTask />}
            />
            <Route path="signup" element={<SignUp />} />
            <Route path="signin" element={<SignIn />} />
          </Routes>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
