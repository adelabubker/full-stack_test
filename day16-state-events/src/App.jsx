import './App.css';
import Counter from './components/Counter';
import LikeButton from './components/LikeButton';

function App() {
    return (
        <div className="page">
            <header className="header">
                <p>
                    useState + events + controlled inputs + mini interactive app (Task Manager).
                </p>
            </header>

            <section className="section">
                <h1>Understanding state</h1>
                <p className="muted">
                    State belongs to a component. When state changes, React re-renders UI.
                </p>

                <div className="components-container">
                    <Counter />
                    <LikeButton />
                </div>
            </section>
        </div>
    );
}

export default App;