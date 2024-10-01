import { useState } from 'react'
import { Link } from "react-router-dom"

import IconButton from './IconButton'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import MenuItem from '@mui/material/MenuItem'

const TopBar = () => {
  const [anchorEl, setAnchorEl] = useState(null)

  const openMenu = (event) => setAnchorEl(event.currentTarget)
  const closeMenu = () => setAnchorEl(null)

  return <div className='my-4 mx-8'>
    <IconButton Icon={MenuIcon} onClick={openMenu} />

    <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={closeMenu}>
      <MenuItem>
        <Link to='/sign-out'>Sign out</Link>
      </MenuItem>
    </Menu>
  </div>
}

export default TopBar
