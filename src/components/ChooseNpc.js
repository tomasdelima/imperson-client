import { useState } from 'react'

import NpcAvatar from './NpcAvatar'
import IconButton from './IconButton.js'
import NpcForm from './NpcForm.js'
import emptyNpc from '../fixtures/npc.json'

import Plus from '@mui/icons-material/Add'

const ChooseNpc = ({ npcs, setNpcs, fetchNpcs, activeNpc, setActiveNpc, setMessages }) => {
  const [npcForm, setNpcForm] = useState({})

  return <div className='flex flex-col flex-grow justify-start items-stretch gap-8 h-full.'>
    <div className='flex flex-row gap-4 shrink-0 overflow-x-auto p-1 justify-center flex-wrap'>
      {npcs.map(npc =>
        <NpcAvatar
          key={npc.id}
          npc={npc}
          activeNpc={activeNpc}
          setActiveNpc={setActiveNpc}
          setNpcForm={setNpcForm}
          setMessages={setMessages}
        />
      )}

      <div className='p-3 flex justify-center items-center w-16 h-16 m-1'>
        <IconButton buttonClass='w-8' Icon={Plus} onClick={() => setNpcForm(emptyNpc)} />

        <NpcForm
          npc={npcForm}
          npcs={npcs}
          setNpcForm={setNpcForm}
          setNpcs={setNpcs}
          fetchNpcs={fetchNpcs}
          setActiveNpc={setActiveNpc}
        />
      </div>
    </div>
  </div>
}

export default ChooseNpc
