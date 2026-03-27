import { useState, useEffect, useContext } from "react";
import RepoList from "../components/RepoList";
import Spinner from 'react-bootstrap/Spinner';
import ProfileCard from "../components/ProfileCard";
import SearchBar from "../components/SearchBar";
import SearchHistory from "../components/SearchHistory";
import ThemeSwitcher from "../components/ThemeSwitcher";
import { ThemeContext } from "../context/ThemeContext";

export default function AppContent() {
    const [username, setUsername] = useState("");
    const [input, setInput] = useState("");
    const [response, setResponse] = useState({
        loading: false,
        error: null,
        profile: null,
        repos: [],
        history: []
    });



    useEffect(() => {
        if (!username) return;

        const controller = new AbortController();
        setResponse(prev => ({ ...prev, loading: true, error: null, profile: null, repos: [] }));

        Promise.all([
            fetch(`https://api.github.com/users/${username}`, { signal: controller.signal }),
            fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=5`, { signal: controller.signal })
        ])
            .then(async ([userRes, repoRes]) => {
                if (!userRes.ok) throw new Error("User not found");
                const userData = await userRes.json();
                const repoData = await repoRes.json();
                setResponse(prev => ({
                    loading: false,
                    error: null,
                    profile: userData,
                    repos: repoData,
                    history: [username, ...prev.history].slice(0, 5) // keep last 5
                }));
            })
            .catch(err => {
                if (err.name === "AbortError") return;
                setResponse(prev => ({ ...prev, error: err.message || "Something went wrong", loading: false }));
            });

        return () => controller.abort();
    }, [username]);

    const handleSearch = () => {
        if (input.trim()) setUsername(input.trim());
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleSearch();
    };

    const { theme } = useContext(ThemeContext)

    return (
        <div style={{ background: theme === "dark" ? "#000" : "#fff", color: theme === "dark" ? "#fff" : "#000", fontFamily: "system-ui", maxWidth: 560, margin: "40px auto", padding: "0 16px" }}>
            <ThemeSwitcher />

            <h2>GitHub Profile Viewer</h2>
            <SearchBar input={input} setInput={setInput} handleKeyDown={handleKeyDown} handleSearch={handleSearch} />
            {response.loading && <Spinner animation="border" variant="success" />}
            {response.error && <p style={{ color: "red" }}>{response.error}</p>}
            {response.profile && !response.loading && (
                <div>
                    <ProfileCard profile={response.profile} />
                    <RepoList repos={response.repos} />
                </div>
            )}
            {response.history.length > 0 &&
                <SearchHistory history={response.history} />
            }
        </div>
    );
}