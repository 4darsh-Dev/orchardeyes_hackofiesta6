import PropTypes from "prop-types"

const Button = ({ children, onClick, type = "button", className = "" }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`w-full py-2 px-4 rounded ${className}`}
        >
            {children}
        </button>
    )
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
    type: PropTypes.oneOf(["button", "submit", "reset"]),
    className: PropTypes.string,
}

export default Button
