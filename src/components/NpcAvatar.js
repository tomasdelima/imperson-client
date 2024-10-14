import { Avatar, Button, Typography } from '@mui/material'
import { useNavigate } from "react-router-dom"

const NpcAvatar = ({ children, npc, activeNpc, onClick }) => {
  const navigate = useNavigate()

  const click = () => {
    if (onClick) {
      onClick()
    } else {
      navigate(npc.id ? `/npcs/${npc.id}` : '/', { replace: true })
    }
  }

  let avatarClass = '!h-12 !w-12'
  if (children) avatarClass += ' !bg-transparent !text-green-700 dark:!text-green-300'

  let buttonClass = '!justify-start text-2xl gap-4 transition-all !p-2 !rounded-full'
  if (npc.id === activeNpc?.id) buttonClass += ' !bg-[#8882] hover:!bg-[#8884]'

  return <Button className={buttonClass} onClick={click}>
    <Avatar src={npc.portrait} className={avatarClass}>
      {children}
    </Avatar>

    <Typography className='grow text-left whitespace-nowrap overflow-ellipsis overflow-hidden max-w-[80vw] lg:max-w-[50vw]' variant='caption1'>
      {npc.name}
    </Typography>
  </Button>
}

export default NpcAvatar
