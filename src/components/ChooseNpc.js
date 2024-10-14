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
  setNpcForm,
  setNpcs,
}) => {
  return <Box
    className='flex flex-col flex-grow justify-start items-stretch gap-8 lg:mx-4 px-4 overflow-y-auto absolute top-16 bottom-8 left-0 right-0'
    sx={{ scrollbarColor: '#8884 transparent', scrollbarWidth: 'thin' }}
  >
    <Box className='flex flex-col items-stretch shrink-0 overflow-y-auto gap-4'>
      <NpcAvatar
        npc={{ id: 'new', name: 'Add NPC' }}
        activeNpc={activeNpc}
        onClick={() => setNpcForm(emptyNpc)}
      >
        <Plus />
      </NpcAvatar>

      {npcs.map(npc =>
        <NpcAvatar
          key={npc.id}
          npc={npc}
          activeNpc={activeNpc}
        />
      )}

      <NpcForm
        activeNpc={activeNpc}
        fetchNpcs={fetchNpcs}
        npc={npcForm}
        npcs={npcs}
        setNpcForm={setNpcForm}
        setNpcs={setNpcs}
      />
    </Box>
  </Box>
}

export default ChooseNpc
