import { Avatar, Button, Typography } from '@mui/material'

const NpcAvatar = ({ children, npc, activeNpc, setActiveNpc }) => {
  let avatarClass = '!h-12 !w-12'
  if (children) avatarClass += ' !bg-transparent !text-green-700 dark:!text-green-300'

  let buttonClass = 'text-2xl gap-4 transition-all !p-2 !rounded-full'
  if (npc.id === activeNpc?.id) buttonClass += ' !bg-[#8882] hover:!bg-[#8884]'

  return <Button
    className={buttonClass}
    onClick={() => setActiveNpc(npc)}
  >
    <Avatar src={npc.portrait} className={avatarClass}>
      {children}
    </Avatar>

    <Typography className='grow text-left' variant='caption1'>
      {npc.name}
    </Typography>
  </Button>
}

export default NpcAvatar
