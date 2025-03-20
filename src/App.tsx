import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { DecrementAction, IncrementAction, store } from "./store.ts";
import {useEffect, useReducer} from "react";


function App() {
// hack for component force update
const [, forceUpdate] = useReducer(x => x + 1, 0);

useEffect(() => {
    const unSubscribe = store.subscribe(() => {
        // function passed here calls each time action fires
        forceUpdate();
    });

    return unSubscribe;
}, [])
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
          counter: {store.getState().counter}
        <button onClick={() => store.dispatch({ type: "increment" } satisfies IncrementAction)}>
          Increment
        </button>
          <button onClick={() => store.dispatch({ type: "decrement" } satisfies DecrementAction)}>
              Decrement
          </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
