
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
export default function SearchHistory({ history }) {
    const { theme } = useContext(ThemeContext);

    return (
        <div style={{color: theme === "dark" ? "#fff" : "#000", background: theme === "dark" ? "#1a1a1a" : "#fff" }}>
            {history.map(uname => (
                <div key={uname} style={{ fontSize: 12, color: "#888" }}>{uname}</div>
            ))}
        </div>
    );
}