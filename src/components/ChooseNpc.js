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
    const messages = response.filter((message) => message.role !== 'system')
    setMessages(messages)
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
    greet: '',
    language: '',
    voice: '',
  })

  return <div className='flex flex-col flex-grow justify-start items-stretch gap-8'>
    <div className="flex flex-row justify-center gap-4">
      {npcs.map(npc =>
        <NpcAvatar
          key={npc.id}
          npc={npc}
          activeNpc={activeNpc}
          setActiveNpc={setActiveNpc}
          setNpcForm={setNpcForm}
        />
      )}

      <div className={newNpcWrapperClass} onClick={() => {}}>
        <IconButton buttonClass={activeNpc ? 'w-8' : 'w-16'} Icon={Plus} onClick={addNpc} />
        {newNpc && <NpcForm
          npc={newNpc}
          npcs={npcs}
          setNpcForm={setNpcForm}
          setNpcs={setNpcs}
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
