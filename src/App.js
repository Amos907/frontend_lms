import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SideBarRoutes from "./components/sidebar/SideBarRoutes";
import Login from "./auth/Login";

function App() {
  return (
    <div className="wrapper">
      <Router>
        <Switch>
          <Route path="/auth/login">
            <Login />
          </Route>
          <SideBarRoutes />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
