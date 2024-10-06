import { useState } from 'react'
import { Link } from "react-router-dom"

import IconButton from './IconButton'
import { Box, Menu, MenuItem } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

const Item = ({ to, close, children }) => <Link to={to}>
  <MenuItem onClick={close}>{children}</MenuItem>
</Link>

const TopBar = () => {
  const [anchorEl, setAnchorEl] = useState(null)

  const open = (event) => setAnchorEl(event.currentTarget)
  const close = () => setAnchorEl(null)

  return <Box className='mx-8'>
    <IconButton Icon={MenuIcon} onClick={open} className='!m-2' />

    <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={close}>
      <Item to='/' close={close}>Chat</Item>
      {/* <Item to='/profile' close={close}>Profile</Item> */}
      <Item to='/sign-out' close={close}>Sign out</Item>
    </Menu>
  </Box>
}

export default TopBar
