import NpcAvatar from './NpcAvatar'
import IconButton from './IconButton.js'
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
  return <Box className='flex flex-col flex-grow justify-start items-stretch gap-8'>
    <Box className='flex flex-col items-stretch shrink-0 overflow-y-auto'>
      {npcs.map(npc =>
        <NpcAvatar
          key={npc.id}
          npc={npc}
          activeNpc={activeNpc}
          setActiveNpc={setActiveNpc}
          setNpcForm={setNpcForm}
        />
      )}

      <Box className='p-2 flex justify-center items-center w-16 h-16'>
        <IconButton buttonClass='w-8' Icon={Plus} onClick={() => setNpcForm(emptyNpc)} />

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
  </Box>
}

export default ChooseNpc
