import React from "react";

interface TypographySelectorProps {
    value: { fontFamily: string; fontSize: number };
    onChange: (value: { fontFamily: string; fontSize: number }) => void;
}

const TypographySelector: React.FC<TypographySelectorProps> = ({ value, onChange }) => {
    const handleFontChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange({ ...value, fontFamily: e.target.value });
    };

    const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange({ ...value, fontSize: parseInt(e.target.value, 10) });
    };

    return (
        <div className="typography-selector">
            <label>
                Font Family:
                <input type="text" value={value.fontFamily || ""} onChange={handleFontChange} />
            </label>
            <label>
                Font Size:
                <input type="number" value={value.fontSize || 16} onChange={handleSizeChange} />
            </label>
        </div>
    );
};

export default TypographySelector;
