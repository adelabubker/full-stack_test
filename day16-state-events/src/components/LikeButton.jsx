import { useState } from "react";

function LikeButton() {
    const [likes, setLikes] = useState(6);

    function like() {
        setLikes(likes + 1);
    }

    function reset() {
        setLikes(6);
    }

    return (
        <div className="card">
            <h2>Like Button</h2>
            <p className="big">{likes}</p>

            <div className="buttons">
                <button onClick={like}>Like</button>
                <button onClick={reset}>Reset</button>
            </div>

            <p className="note">
                Event names in React are camelCase<br />
                (onClick, onChange).
            </p>
        </div>
    );
}

export default LikeButton;