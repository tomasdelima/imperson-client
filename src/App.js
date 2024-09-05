import React, { useEffect, useState } from 'react'

import ChooseNpc from './ChooseNpc.js'

const App = () => {
  const [activeNpc, setActiveNpc] = useState(null)
  const [messages, setMessages] = useState([])

  useEffect(() => {
    fetchMessages()
  }, [activeNpc])

  const fetchMessages = async () => {
    if (!activeNpc?.id) return

    const response = await fetch(`${window.env.API_URL}/messages?npc_id=${activeNpc?.id}`)
    let messages = await response.json()
    messages = messages.filter((message) => message.role !== 'system')
    setMessages(messages)
  }

  return <div className="h-screen p-4 flex flex-col justify-start">
    <ChooseNpc
      activeNpc={activeNpc}
      setActiveNpc={setActiveNpc}
      messages={messages}
      setMessages={setMessages}
    />
  </div>
}

export default App
