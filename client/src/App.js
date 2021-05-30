// for redux
import { Provider } from "react-redux";
import store from "./store";
//actions
// import { UserLoaded } from "./actions/auth";

// import { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/profile";
import Navbar from "./components/Navbar";
import NotFound from "./components/Notfound";
import Post from "./components/post";
import Profiles from "./components/profiles";

function App() {
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
            <Route path="/profile/:id" exact>
              <Profiles />
            </Route>
            <Route path="/profile" exact>
              <Profile />
            </Route>
            <Route path="/post/:id">
              <Post />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
