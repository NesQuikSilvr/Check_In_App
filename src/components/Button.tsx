interface ButtonProp {
    label: string;
    color?: "primary" | "secondary" | "danger";
    onClick: () => void;
}

const Button = ({ label, color = "primary", onClick }: ButtonProp) => {
    return (
        <button type="button" className={"btn btn-" + color} onClick={onClick}>
            {label}
        </button>
    )
}

export default Button;