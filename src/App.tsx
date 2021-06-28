import React, { useContext } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Loading from './components/Loading';
import { UserContext } from './providers/UserProvider';

function App() {
  const { isLoading, user } = useContext(UserContext);

  if (isLoading) return <Loading />;

  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Route exact path="/"></Route>
          <Route exact path="/profile">
            <h1>Profile</h1>
          </Route>
          {user && (
            <>
              <Route exact path="/home">
                <h1>Home</h1>
              </Route>

              <Route exact path="/conversion">
                <h1>Conversion</h1>
              </Route>
            </>
          )}
        </main>
      </div>
    </Router>
  );
}

export default App;
