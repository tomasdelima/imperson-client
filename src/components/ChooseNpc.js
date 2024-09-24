import { useEffect, useState } from 'react'

import NpcAvatar from './NpcAvatar'
import Chat from './Chat.js'
import Plus from './Plus.js'
import IconButton from './IconButton.js'
import NpcForm from './NpcForm.js'

import get from '../utils/get.js'

const ChooseNpc = () => {
  const [activeNpc, setActiveNpc] = useState(null)
  const [npcs, setNpcs] = useState([])
  const [newNpc, setNpcForm] = useState(null)
  const [messages, setMessages] = useState([])

  const fetchNpcs = async () => {
    const response = await get('npcs')
    setNpcs(response)
  }

  const fetchMessages = async () => {
    if (!activeNpc?.id) return

    const response = await get(`messages?npc_id=${activeNpc?.id}`)
    setMessages(response)
  }

  useEffect(() => {
    fetchNpcs()
  }, [])

  useEffect(() => {
    fetchMessages()
  }, [activeNpc])

  let newNpcWrapperClass = 'p-3 flex justify-center items-center'
  if (activeNpc?.id) {
    newNpcWrapperClass += ' w-16 h-16 m-1'
  } else {
    newNpcWrapperClass += ' h-40 w-40 my-4'
  }

  const addNpc = () => setNpcForm({
    id: '',
    name: '',
    portrait: '',
    traits: '',
    gender: '',
    race: '',
    job: '',
    alignment: '',

    extraversion: 3,
    agreeableness: 3,
    conscientiousness: 3,
    neuroticism: 3,
    openness_to_experience: 3,

    tone: '',
    empathy: 3,
    verbosity: 3,
    humor: 3,
    formality: 3,

    language: '',
    voice: '',
  })

  return <div className='flex flex-col flex-grow justify-start items-stretch gap-8'>
    <div className='flex flex-row gap-4 overflow-x-auto p-1 pb-4 justify-center flex-wrap'>
      {npcs.map(npc =>
        <NpcAvatar
          key={npc.id}
          npc={npc}
          activeNpc={activeNpc}
          setActiveNpc={setActiveNpc}
          setNpcForm={setNpcForm}
        />
      )}

      <div className={newNpcWrapperClass}>
        <IconButton buttonClass={activeNpc ? 'w-8' : 'w-16'} Icon={Plus} onClick={addNpc} />
        {newNpc && <NpcForm
          npc={newNpc}
          npcs={npcs}
          setNpcForm={setNpcForm}
          setNpcs={setNpcs}
          fetchNpcs={fetchNpcs}
          setActiveNpc={setActiveNpc}
        />}
      </div>
    </div>

    <Chat
      activeNpc={activeNpc}
      messages={messages}
      setMessages={setMessages}
     />
  </div>
}

export default ChooseNpc
