const NpcAvatar = ({ npc, activeNpc, setActiveNpc, setNpcForm }) => {
  const active = npc.id === activeNpc?.id

  let wrapperClass = 'flex items-center justify-center transition-all hover:transition-all cursor-pointer rounded-full ring-offset-[#282c34]'
  let imgClass = 'object-cover rounded-full'

  if (active) {
    wrapperClass += ' ring ring-slate-100'
  } else {
    wrapperClass += ' hover:ring-slate-500'
  }

  if (activeNpc?.id) {
    wrapperClass += ' h-16 w-16 m-1 ring-offset-4 hover:ring text-3xl'
    imgClass += ' h-16 w-16'
  } else {
    wrapperClass += ' h-40 w-40 m-4 ring-offset-8 hover:ring-8 text-6xl'
    imgClass += ' h-40 w-40'
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
    <div className={wrapperClass} onClick={click}>
      {npc.portrait ? <img
        className={imgClass}
        alt={npc.name}
        src={npc.portrait}
      /> : <span className=''>
        {npc.name.split(' ').slice(0, 2).map(n => n && n[0])}
      </span>}
    </div>
    <div
      className={spanClass}
      onClick={edit}
    >
      {npc.name}
    </div>
  </div>
}

export default NpcAvatar
