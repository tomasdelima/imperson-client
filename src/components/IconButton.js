import MaterialIconButton from '@mui/material/IconButton'

const IconButton = ({ onClick, disabled = false, Icon }) => {
  return <MaterialIconButton
    onClick={onClick}
    disabled={disabled}
    color='primary'
    size='large'
  >
    <Icon />
  </MaterialIconButton>
}

export default IconButton
