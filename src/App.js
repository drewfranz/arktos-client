import { Loading, HeaderNav } from './components';
import { Home, Tasks, Profile, AddTask, TaskDetail } from './views';

import ProtectedRoute from './auth/ProtectedRoute';

import { useAuth0 } from "@auth0/auth0-react";

import "bootswatch/dist/lux/bootstrap.min.css";
import './App.css';
import { Route, Switch } from 'react-router-dom';

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="App">
        <header>
          <HeaderNav />
        </header>
        <Switch>
          <Route path="/" exact component={Home} />
          <ProtectedRoute path="/tasks" exact component={Tasks} />
          <ProtectedRoute path="/add/task" exact component={AddTask} />
          <ProtectedRoute path="/task/view/:id" exact component={TaskDetail} />
          <ProtectedRoute path="/profile" exact component={Profile} />
        </Switch>
      </div>
    </>
  );
}

export default App;
