import NpcAvatar from './NpcAvatar'
import IconButton from './IconButton.js'
import NpcForm from './NpcForm.js'
import emptyNpc from '../fixtures/npc.json'
import { Box, Typography } from '@mui/material'

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
  return <Box className='flex flex-col flex-grow justify-start items-stretch gap-8 mx-8'>
    <Box className='flex flex-col items-stretch shrink-0 overflow-y-auto gap-4'>
      {npcs.map(npc =>
        <NpcAvatar
          key={npc.id}
          npc={npc}
          activeNpc={activeNpc}
          setActiveNpc={setActiveNpc}
        />
      )}

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
    </Box>
  </Box>
}

export default ChooseNpc
