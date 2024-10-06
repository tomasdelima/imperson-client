import { Avatar, Button, Typography } from '@mui/material'

const NpcAvatar = ({ children, npc, activeNpc, setActiveNpc }) => {
  return <Button
    className='text-2xl gap-4 transition-all !p-2 !rounded-full'
    sx={{ background: npc.id === activeNpc?.id ? '#0001' : '' }}
    onClick={() => setActiveNpc(npc)}
  >
    <Avatar src={npc.portrait} className='!h-12 !w-12'>
      {children}
    </Avatar>

    <Typography className='grow text-left' variant='caption1'>
      {npc.name}
    </Typography>
  </Button>
}

export default NpcAvatar
