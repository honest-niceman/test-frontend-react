import React from 'react';
import ProjectForm from './components/project/ProjectForm';
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <ProjectForm />
      </div>
    </Router>
  );
}

export default App;
