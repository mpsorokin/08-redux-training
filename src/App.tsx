import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {CounterId, DecrementAction, IncrementAction, store} from "./store.ts";
import {useEffect, useReducer} from "react";


function App() {

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
        <Counter counterId="first" />
        <Counter counterId="second" />
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export function Counter({counterId}: {counterId: CounterId}) {
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
            <div className="card">
                counter: {store.getState().counters[counterId]?.counter}
                <button onClick={() => store.dispatch({ type: "increment", payload: {counterId} } satisfies IncrementAction)}>
                    Increment
                </button>
                <button onClick={() => store.dispatch({ type: "decrement", payload: {counterId} } satisfies DecrementAction)}>
                    Decrement
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
        </>
    )
}

export default App
