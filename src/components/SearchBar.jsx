import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function SearchBar({ input, setInput, handleKeyDown, handleSearch }) {
    const { theme } = useContext(ThemeContext)
    return (
        <div style={{ display: "flex", gap: 8, marginBottom: 24, color: theme === "dark" ? "#fff" : "#000", background: theme === "dark" ? "#1a1a1a" : "#fff" }}>
            <input style={{
                flex: 1, padding: "10px 14px", borderRadius: 8,
                border: "1.5px solid #e5e7eb", fontSize: 14,
                background: theme === "dark" ? "#1a1a1a" : "#fff",
                color: theme === "dark" ? "#fff" : "#000"
            }}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter GitHub username..."
            />
            <button onClick={handleSearch} style={{ padding: "10px 20px", borderRadius: 8, border: "none", background: "#6366f1", color: "#fff", cursor: "pointer" }}>
                Search
            </button>
        </div>
    );
}