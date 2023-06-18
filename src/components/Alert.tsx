interface AlertProp {
    children: React.ReactNode;
}

const Alert = ({ children }: AlertProp) => {
    return (
        <div className="alert alert-primary" role="alert">
            {children}
        </div>
    )
}

export default Alert;