import { Avatar, Box, Button, Typography } from '@mui/material'

const NpcAvatar = ({ npc, setMessages, activeNpc, setActiveNpc, setNpcForm }) => {
  const active = npc.id === activeNpc?.id
  const selected = activeNpc?.id

  let wrapperClass = '!rounded-full h-16 w-16 !m-1 ring-offset-4 hover:ring text-2xl'
  let imgClass = 'transition-all !h-16 !w-16'

  if (active) {
    wrapperClass += ' ring ring-slate-500'
  } else {
    wrapperClass += ' hover:ring-slate-200'
  }

  const spanClass = 'hover:underline cursor-pointer text-sm mt-2'

  const click = () => {
    if (active) {
      setActiveNpc(null)
      setMessages([])
    } else {
      setActiveNpc(npc)
    }
  }

  const edit = () => {
    setNpcForm(npc)
  }

  return <Box className='flex flex-col items-center'>
    <Button className={wrapperClass} onClick={click}>
      <Avatar src={npc.portrait} className={imgClass} />
    </Button>

    <Box onClick={edit}>
      <Typography className={spanClass} variant='caption1'>
        {npc.name}
      </Typography>
    </Box>
  </Box>
}

export default NpcAvatar
