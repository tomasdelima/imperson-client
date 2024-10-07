import { Box, Button, Typography } from '@mui/material'
import emptyNpc from '../fixtures/npc.json'

const NoNpcSelected = ({ npcs, setNpcForm }) => {
  return <Box className='h-full flex flex-col justify-center items-center gap-4'>
    <Typography variant='h4'>Welcome to Imperson!</Typography>

    {npcs.length ? <Typography variant='h6'>
      Choose an NPC to chat with
    </Typography> : <Box className='flex items-center gap-1'>
      <Button onClick={() => setNpcForm(emptyNpc)}>
        Click here
      </Button>
      <Typography>to create an NPC</Typography>
    </Box>}
  </Box>
}

export default NoNpcSelected
