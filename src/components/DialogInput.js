import IconButton from './IconButton'
import { Box, TextField } from '@mui/material'

import Send from '@mui/icons-material/Send'

const DialogInput = ({ dialog, text, setText }) => {
  const handleKeyDown = (event) => event.key === 'Enter' && dialog()

  return <Box className='h-32 w-full flex flex-row items-center gap-8'>
    <TextField
      className='grow rounded'
      value={text}
      onChange={e => setText(e.target.value)}
      onKeyDown={handleKeyDown}
      variant='outlined'
      size='small'
    />

    <IconButton
      icon={Send}
      onClick={() => dialog()}
      disabled={text.length === 0}
      buttonClass='w-6'
    />
  </Box>
}

export default DialogInput
