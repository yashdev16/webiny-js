import React from "react";

interface ColorPickerProps {
    value: { color: string };
    onChange: (value: { color: string }) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange }) => {
    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange({ ...value, color: e.target.value });
    };

    return (
        <div className="color-picker">
            <label>
                Color:
                <input type="color" value={value.color || "#000000"} onChange={handleColorChange} />
            </label>
        </div>
    );
};

export default ColorPicker;
