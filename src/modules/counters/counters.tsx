import { useAppSelector} from "../../store.ts";
import { useDispatch } from "react-redux";
import { CounterId, DecrementAction, IncrementAction, selectCounter } from "./counters.slice.ts";

//export const selectCounter = (state: AppState, counterId: CounterId) => state.counters[counterId];

export function Counter({counterId}: {counterId: CounterId}) {
    const dispatch = useDispatch();
    const counterState = useAppSelector((state) => selectCounter(state, counterId));

    /*
    // hack for component force update
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    console.log('render counter  ', counterId);

    const lastStateRef = useRef<ReturnType<typeof selectCounter>>();

    useEffect(() => {
        const unSubscribe = store.subscribe(() => {
            const currentState = selectCounter(store.getState(), counterId);
            const lastState = lastStateRef.current;

            if(currentState !== lastState) {
                // function passed here calls each time action fires
                forceUpdate();
            }

            lastStateRef.current = currentState;
        });

        return unSubscribe;
    }, [])*/

    //const counterState = selectCounter(store.getState(), counterId);
    return (
        <>
            <div className="card">
                counter: {counterState?.counter}
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => dispatch({ type: "increment", payload: {counterId} } satisfies IncrementAction)}>
                    Increment
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => dispatch({ type: "decrement", payload: {counterId} } satisfies DecrementAction)}>
                    Decrement
                </button>
            </div>
        </>
    )
}