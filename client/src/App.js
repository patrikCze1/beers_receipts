import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from '@apollo/react-hooks';
import Beers from './components/Beers';
import Beer from './components/Beer';
import {BrowserRouter as Router, Route } from 'react-router-dom';

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
      <div className="App">
        <div className="container">
          <Route exact path="/" component={Beers} />
          <Route exact path="/beer/:id" component={Beer} />
        </div>
      </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
