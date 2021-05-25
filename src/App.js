import React from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import HomePage from './Components/HomePage'
import MoviePage from './Components/MoviePage'

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" render={(props) => <HomePage />} />
          <Route
            exact
            path="/movie/:id/"
            render={(props) => <MoviePage {...props} />}
          />
        </Switch>
      </div>
    </Router>
  )
}

export default App
