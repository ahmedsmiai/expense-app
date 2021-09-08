import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { NavBar, ProtectedRoute } from './components'
import { Login, Home, Signup, Edit } from './pages'
import { Container } from 'reactstrap'

function App() {
  return (
    <div>
      <NavBar />
      <Container>
        <Switch>
          <ProtectedRoute path="/" component={Home} exact />
          <ProtectedRoute path ="/edit" component={Edit} exact />
        </Switch>
          <Route path="/Signup" component={Signup} exact />
          <Route path="/Login" component={Login} exact />
      </Container>
    </div>
  );
}

export default App;
