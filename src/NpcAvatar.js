const NpcAvatar = ({ npc, activeNpc, setActiveNpc, setNpcForm }) => {
  const active = npc.id === activeNpc?.id

  let imgClass = 'transition-all hover:transition-all cursor-pointer rounded-full object-cover ring-offset-[#282c34]'

  if (active) {
    imgClass += ' ring ring-slate-100'
  } else {
    imgClass += ' hover:ring-slate-500'
  }

  if (activeNpc?.id) {
    imgClass += ' h-16 w-16 m-1 ring-offset-4 hover:ring'
  } else {
    imgClass += ' h-40 w-40 m-4 ring-offset-8 hover:ring-8'
  }

  let spanClass = 'hover:underline cursor-pointer'
  spanClass += activeNpc?.id ? ' text-sm mt-2' : ''

  const click = () => {
    if (active) {
      setActiveNpc(null)
    } else {
      setActiveNpc(npc)
    }
  }

  const edit = () => {
    setNpcForm(npc)
  }

  return <div className='flex flex-col items-center'>
    <img
      onClick={click}
      className={imgClass}
      alt={npc.name}
      src={npc.portrait}
    />
    <div
      className={spanClass}
      onClick={edit}
    >
      {npc.name}
    </div>
  </div>
}

export default NpcAvatar
