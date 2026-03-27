import { useContext } from "react";
import {ThemeContext} from '../context/ThemeContext'

export default function ProfileCard({ profile }) {
    const { theme } = useContext(ThemeContext);

    return (
        <div>
            <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 20 , color: theme === "dark" ? "#fff" : "#000", background: theme === "dark" ? "#1a1a1a" : "#fff"}}>
                <img src={profile.avatar_url} width={72} style={{ borderRadius: "50%" }} />
                <div>
                    <div style={{ fontWeight: 700, fontSize: 18 }}>{profile.name || profile.login}</div>
                    <div style={{ color: theme === "dark" ? "#aaa" : "#555" }}>@{profile.login}</div>
                    {profile.bio && <div style={{ color: theme === "dark" ? "#aaa" : "#555", fontSize: 13 }}>{profile.bio}</div>}
                    {profile.location && <div style={{ color: theme === "dark" ? "#aaa" : "#555", fontSize: 13 }}><div style={{ color: "#555", fontSize: 13 }}>📍 {profile.location}</div></div>}
                    {profile.blog && <div style={{ color: theme === "dark" ? "#aaa" : "#555", fontSize: 13 }}>
                        🔗 <a href={profile.blog} target="_blank" rel="noreferrer">
                            {profile.blog}
                        </a>
                    </div>
                    }
                </div>
            </div>
            <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
                {[{ label: "Repos", value: profile.public_repos }, { label: "Followers", value: profile.followers }, { label: "Following", value: profile.following }].map(s => (
                    <div key={s.label} style={{ flex: 1, background: "#f0f4ff", borderRadius: 10, padding: "12px 8px", textAlign: "center" }}>
                        <div style={{ fontWeight: 700, fontSize: 18, color: "#4338ca" }}>{s.value}</div>
                        <div style={{ fontSize: 12, color: "#888" }}>{s.label}</div>
                    </div>
                ))}
            </div>
        </div>

    );
}