import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
export default function ThemeSwitcher() {
    const radios = [
        { name: 'Light', value: 'light' },
        { name: 'Dark', value: 'dark' }
    ];
    const { theme, toggleTheme } = useContext(ThemeContext)
    return (
        <div style={{ color: theme === "dark" ? "#fff" : "#000", background: theme === "dark" ? "#1a1a1a" : "#fff" }}>
            <ButtonGroup >
                {radios.map((radio, idx) => (
                    <ToggleButton
                        key={radio.name}
                        id={radio.name}
                        type="radio"
                        variant={theme === radio.value ? "primary" : "outline-secondary"}
                        name={radio.name}
                        value={radio.value}
                        checked={theme === radio.value}
                        onChange={toggleTheme}>
                        {radio.name}
                    </ToggleButton>
                ))}
            </ButtonGroup>
        </div>
    );
}