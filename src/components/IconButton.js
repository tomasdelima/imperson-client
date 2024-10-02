import { Tooltip, IconButton as MaterialIconButton } from '@mui/material'

const IconButton = ({
  color = 'primary',
  disabled = false,
  Icon,
  onClick,
  tooltip,
}) => {
  const innerButton = <MaterialIconButton
    onClick={onClick}
    disabled={disabled}
    color={color}
    size='large'
  >
    <Icon />
  </MaterialIconButton>

  if (tooltip && !disabled) {
    return <Tooltip title={tooltip}>
      {innerButton}
    </Tooltip>
  } else {
    return innerButton
  }
}

export default IconButton
