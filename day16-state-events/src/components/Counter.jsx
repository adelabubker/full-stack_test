import { useState } from "react";

function Counter() {
    const [count, setCount] = useState(0);

    function decrease() {
        setCount(count - 1);
    }

    function increase() {
        setCount(count + 1);
    }

    function reset() {
        setCount(0);
    }

    return (
        <div className="card">
            <h2>Counter</h2>
            <p className="big">{count}</p>

            <div className="buttons">
                <button onClick={decrease}>- Decrease</button>
                <button onClick={increase}>+ Increase</button>
                <button onClick={reset}>Reset</button>
            </div>

            <p className="note">
                Normal variables do not trigger re-render.<br />
                State does.
            </p>
        </div>
    );
}

export default Counter;