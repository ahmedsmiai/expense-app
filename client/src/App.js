import React from 'react'
import { Route } from 'react-router-dom'
import { NavBar } from './components'
import { Login, Home, Signup } from './pages'
import { Container } from 'reactstrap'

function App() {
  return (
    <div>
      <NavBar />
      <Container>
        <Route path="/" component={Home} exact />
       <Route path="/Signup" component={Signup} exact /> 
        <Route path="/Login" component={Login} exact />
      </Container>
    </div>
  );
}

export default App;
