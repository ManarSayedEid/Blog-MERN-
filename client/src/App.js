// for redux
import { Provider } from "react-redux";
import store from "./store";
//actions
import { UserLoaded } from "./actions/auth";

import { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/profile";
import Navbar from "./components/Navbar";
import { getProfile } from "./actions/profile";

function App() {
  // console.log(store);

  // only the first time loading the page
  useEffect(() => {
    store.dispatch(UserLoaded());
    store.dispatch(getProfile());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/" exact>
              <Navbar />
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
