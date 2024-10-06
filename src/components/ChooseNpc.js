import NpcAvatar from './NpcAvatar'
import NpcForm from './NpcForm.js'
import emptyNpc from '../fixtures/npc.json'
import { Box } from '@mui/material'

import Plus from '@mui/icons-material/Add'

const ChooseNpc = ({
  activeNpc,
  fetchNpcs,
  npcForm,
  npcs,
  setActiveNpc,
  setNpcForm,
  setNpcs,
}) => {
  return <Box className='flex flex-col flex-grow justify-start items-stretch gap-8 mx-8 overflow-y-auto absolute top-16 bottom-8 left-0 right-0'>
    <Box className='flex flex-col items-stretch shrink-0 overflow-y-auto gap-4'>
      <NpcAvatar
        npc={{ name: 'Add NPC' }}
        activeNpc={activeNpc}
        setActiveNpc={() => setNpcForm(emptyNpc)}
      >
        <Plus />
      </NpcAvatar>

      <NpcForm
        activeNpc={activeNpc}
        fetchNpcs={fetchNpcs}
        npc={npcForm}
        npcs={npcs}
        setActiveNpc={setActiveNpc}
        setNpcForm={setNpcForm}
        setNpcs={setNpcs}
      />

      {npcs.map(npc =>
        <NpcAvatar
          key={npc.id}
          npc={npc}
          activeNpc={activeNpc}
          setActiveNpc={setActiveNpc}
        />
      )}
    </Box>
  </Box>
}

export default ChooseNpc
