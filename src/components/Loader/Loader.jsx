import styles from "./Loader.module.css";

export const Loader = ({ onDone }) => {

    const handleAnimationEnd = (e) => {
        if (e.animationName === styles.loaderOut || e.target.classList.contains(styles.backdrop)) {
            onDone?.();
        }
    };

    return (
        <div
            className={styles.backdrop}
            role="status"
            aria-live="polite"
            aria-label="Loading"
            onAnimationEnd={handleAnimationEnd}
        >
            <div className={styles.logoWrap}>
                <svg
                    className={styles.logo}
                    viewBox="0 0 200 200"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    {/* Hexagon outline (stroke-draw) */}
                    <path
                        className={styles.hex}
                        d="
              M100,10
              L173.205,52.5
              L173.205,147.5
              L100,190
              L26.795,147.5
              L26.795,52.5
              Z
            "
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="10"
                        strokeLinejoin="round"
                    />
                    {/* Filled hexagon background to match your brand color */}
                    <path
                        className={styles.hexFill}
                        d="
              M100,10
              L173.205,52.5
              L173.205,147.5
              L100,190
              L26.795,147.5
              L26.795,52.5
              Z
            "
                    />
                    {/* The "S" letter (appears after edge animation) */}
                    <text
                        x="50%"
                        y="50%"
                        textAnchor="middle"
                        dominantBaseline="central"
                        className={styles.letter}
                    >
                        S
                    </text>
                </svg>
            </div>
        </div>
    );
};
