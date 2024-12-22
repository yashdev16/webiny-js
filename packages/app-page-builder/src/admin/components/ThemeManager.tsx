import React, { useState } from "react";
import TypographySelector from "./TypographySelector";
import ColorPicker from "./ColorPicker";

const ThemeManager: React.FC = () => {
    const [typography, setTypography] = useState<{ fontFamily: string; fontSize: number }>({
        fontFamily: "",
        fontSize: 16
    });

    const [colorScheme, setColorScheme] = useState<{ color: string }>({ color: "#000000" });

    const handleSave = () => {
        console.log("Typography settings:", typography);
        console.log("Color scheme settings:", colorScheme);

        localStorage.setItem("typographySettings", JSON.stringify(typography));
        localStorage.setItem("colorSchemeSettings", JSON.stringify(colorScheme));

        fetch("/api/save-theme-settings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                typography,
                colorScheme
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log("Success:", data);
            })
            .catch(error => {
                console.error("Error:", error);
            });
    };

    return (
        <div className="theme-manager">
            <h2>Theme Manager</h2>
            {/* Render the TypographySelector and ColorPicker components */}
            <TypographySelector value={typography} onChange={setTypography} />
            <ColorPicker value={colorScheme} onChange={setColorScheme} />
            {/* Button to save the settings */}
            <button onClick={handleSave}>Save Theme</button>
        </div>
    );
};

export default ThemeManager;
