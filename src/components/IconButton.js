const IconButton = ({ onClick, disabled = false, Icon, buttonClass }) => {
  let className = 'button select-none '
  if (buttonClass) {
    className += buttonClass
  }

  if (disabled) {
    className += ' cursor-not-allowed'
  } else {
    className += ' cursor-pointer opacity-80 hover:opacity-100 transition-opacity duration-200 ease-in-out'
  }

  return <div onClick={() => disabled || onClick()} className={className}>
    <Icon fill={disabled ? '#777' : '#ddd'}  />
  </div>
}

export default IconButton
