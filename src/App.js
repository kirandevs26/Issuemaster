import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Issues from './components/Issues';
import IssueDetails from './components/IssueDetails';
import './App.css';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Route path="/" exact component={Issues} />
          <Route path="/issue/:id" component={IssueDetails} />
        </BrowserRouter>
      </div>
  );
}

export default App;
