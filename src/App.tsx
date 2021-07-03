import React, { useContext } from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import Convert from './components/Convert';
import Header from './components/Header';
import Home from './components/Home';
import Loading from './components/Loading';
import ProfilePage from './components/ProfilePage';
import { UserContext } from './providers/UserProvider';

function App() {
  const { isLoading, user } = useContext(UserContext);

  if (isLoading) return <Loading />;

  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Route exact path="/">
            <Redirect to={user ? '/home' : '/profile'} />
          </Route>
          <Route exact path="/profile">
            <ProfilePage />
          </Route>
          {user && (
            <>
              <Route exact path="/home">
                <Home />
              </Route>

              <Route exact path="/conversion">
                <Convert />
              </Route>
            </>
          )}
        </main>
      </div>
    </Router>
  );
}

export default App;
