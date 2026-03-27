import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function RepoList({ repos }) {
    const { theme } = useContext(ThemeContext)
    return (
        <div style={{ color: theme === "dark" ? "#fff" : "#000", background: theme === "dark" ? "#1a1a1a" : "#fff" }}>
            {repos.length == 0 && <p>No repos found</p>}
            {repos.map(repo => (
                <a key={repo.id} href={repo.html_url} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                    <div style={{ border: "1.5px solid #e5e7eb", borderRadius: 10, padding: "12px 14px", marginBottom: 8 }}>
                        <div style={{ fontWeight: 600, color: "#4338ca" }}>{repo.name}</div>
                        {repo.description && <div style={{ fontSize: 12, color: "#666" }}>{repo.description}</div>}
                        <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>⭐ {repo.stargazers_count} {repo.language && `· ${repo.language}`}</div>
                    </div>
                </a>
            ))}
        </div>
    );
}