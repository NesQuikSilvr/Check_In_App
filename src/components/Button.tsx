interface ButtonProp {
    label: string;
    onClick: () => void;
}

const Button = ({ label, onClick }: ButtonProp) => {

    return (
        <button type="button" className={"btn btn-outline-dark btn-sm"} onClick={onClick}>
            {label}
        </button>
    )
}

export default Button;