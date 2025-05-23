export function Slider({ value, max, step, onChange, disabled, className }) {
    return (
        <input
        type="range"
        min="0"
        max={max}
        step={step}
        value={value[0]}
        onChange={(e) => onChange && onChange([parseInt(e.target.value)])}
        disabled={disabled}
        className={`w-full ${className}`}
        
        />
    );
}