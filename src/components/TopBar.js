import { useState } from 'react'
import { Link } from "react-router-dom"

import IconButton from './IconButton'
import { Box, Menu, MenuItem, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

const Item = ({ to, close, children }) => <Link to={to}>
  <MenuItem onClick={close}>{children}</MenuItem>
</Link>

const TopBar = () => {
  const [anchorEl, setAnchorEl] = useState(null)

  const open = (event) => setAnchorEl(event.currentTarget)
  const close = () => setAnchorEl(null)

  return <Box className='lg:mr-4 pr-4 pl-4 lg:pl-8 bg-[#8882] flex items-center'>
    <IconButton icon={MenuIcon} onClick={open} className='!m-2' />

    <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={close}>
      {/* <Item to='/' close={close}>Chat</Item> */}
      {/* <Item to='/profile' close={close}>Profile</Item> */}
      <Item to='/sign-out' close={close}>Sign out</Item>
    </Menu>

    <Typography variant='button'>IMPERSON</Typography>
  </Box>
}

export default TopBar
