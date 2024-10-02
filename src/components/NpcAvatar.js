import { Avatar, Button, Typography } from '@mui/material'

const NpcAvatar = ({ npc, activeNpc, setActiveNpc, setNpcForm }) => {
  return <Button
    className='text-2xl gap-4 transition-all !p-2'
    sx={{ background: npc.id === activeNpc?.id ? '#0001' : '' }}
    onClick={() => setActiveNpc(npc)}
  >
    <Avatar src={npc.portrait} className='!h-12 !w-12' />

    <Typography className='grow text-left' variant='caption1'>
      {npc.name}
    </Typography>
  </Button>
}

export default NpcAvatar
