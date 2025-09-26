import { UseState } from './components/UseState.js'
import { ClassState } from './components/ClassState.js'
import './App.css';
import { UseReducer } from './components/UseReducer.js';

function App() {
  return (
    <div className="App">
      <UseState name="Use State" />
      <UseReducer name="Reducer State" />
    </div>
  );
}

export default App;
