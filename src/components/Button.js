const Button = ({ label, variant, onClick }) => {
  let className = "cursor-pointer rounded hover:bg-gray-900 px-4 py-2 mt-8 transition-all duration-200 select-none self-center"

  if (variant == 'danger') {
    className += " hover:bg-red-700"
  }

  return <button
    className={className}
    onClick={onClick}
  >
    {label}
  </button>
}

export default Button
