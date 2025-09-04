import { UseState } from './components/UseState.js'
import { ClassState } from './components/ClassState.js'
import './App.css';

function App() {
  return (
    <div className="App">
      <UseState name="Use State" />
      <ClassState name="Class State" />
    </div>
  );
}

export default App;
