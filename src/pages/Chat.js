import { useEffect, useState } from 'react'

import { Box, Button, TextField } from '@mui/material'
import ChooseNpc from '../components/ChooseNpc.js'
import ChatControls from '../components/ChatControls.js'
import IconButton from '../components/IconButton.js'
import Send from '@mui/icons-material/Send'
import Message from '../components/Message'

import get from '../utils/get.js'
import post from '../utils/post.js'

const Chat = () => {
  const [activeNpc, setActiveNpc] = useState(null)
  const [npcs, setNpcs] = useState([])
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const [transcribeLoading, setTranscribeLoading] = useState(false)
  const [speechLoading, setSpeechLoading] = useState(false)
  const [autoPlay, setAutoPlay] = useState(false)

  const loading = transcribeLoading || speechLoading
  const lastMessage = messages[messages.length - 1]
  const showReplyButtons = lastMessage?.ask_for_check && lastMessage?.role === 'assistant'

  const fetchNpcs = async () => {
    const response = await get('npcs')
    setNpcs(response)
  }

  const fetchMessages = async () => {
    if (!activeNpc?.id) return

    const response = await get(`messages?npc_id=${activeNpc?.id}`)
    setMessages(response)
  }

  const reason = async () => {
    if (speechLoading) return

    setSpeechLoading(true)
    setAutoPlay(true)

    const message = await post(`npcs/${activeNpc.id}/reason`)

    setSpeechLoading(false)
    return message
  }

  const transcribe = async (recordingBlob) => {
    if (transcribeLoading) return

    setTranscribeLoading(true)
    const formData = new FormData()
    formData.append('audio_data', recordingBlob, 'file')
    formData.append('type', 'webm')

    const userMessage = await post(`npcs/${activeNpc.id}/transcribe`, formData, {
      setContentType: false,
      stringifyBody: false,
    })

    setTranscribeLoading(false)
    setMessages([...messages, userMessage])
    const systemMessage = await reason()
    setMessages([...messages, userMessage, systemMessage])
  }

  const dialog = async (manualText) => {
    const theText = manualText || text

    if (theText.length === 0) return
    if (loading) return

    setTranscribeLoading(true)

    const userMessage = await post(`messages`, { text: theText, npc_id: activeNpc.id })

    setTranscribeLoading(false)
    setText('')
    setMessages([...messages, userMessage])
    const systemMessage = await reason()
    setMessages([...messages, userMessage, systemMessage])
  }

  useEffect(() => {
    fetchNpcs()
  }, [])

  useEffect(() => {
    fetchMessages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeNpc])

  useEffect(() => {
    const element = document.getElementsByClassName('messages-wrapper')[0]
    element.scrollTo({ top: element.scrollHeight, behavior: 'smooth' })
  }, [messages])

  const handleKeyDown = (event) => event.key === 'Enter' && dialog()

  return <Box className='h-full relative flex flex-col justify-between items-center'>
    <Box className='h-40 z-10'>
      <ChooseNpc
        npcs={npcs}
        setNpcs={setNpcs}
        fetchNpcs={fetchNpcs}
        activeNpc={activeNpc}
        setActiveNpc={setActiveNpc}
        setMessages={setMessages}
      />

      <ChatControls
        transcribe={transcribe}
        messages={messages}
        setMessages={setMessages}
        activeNpc={activeNpc}
        setAutoPlay={setAutoPlay}
      />
    </Box>

    <Box
      sx={{ scrollbarColor: '#0002 transparent', scrollbarWidth: 'thin' }}
      className='messages-wrapper absolute top-40 bottom-20 overflow-x-scroll left-0 right-0 max-w-4xl m-auto flex flex-col pr-4 gap-4 py-4 pr-8'
    >
      {messages.map((item, index) =>
        <Message
          key={index}
          item={item}
          autoPlay={autoPlay}
        />
      )}

      {showReplyButtons && <div className='flex flex-row justify-end self-stretch gap-8'>
        <Button className='bg-gray-700 px-4 py-2 rounded' onClick={() => dialog('Failure')} classes='mt-0 hover:bg-gray-700'>Failure</Button>
        <Button className='bg-gray-700 px-4 py-2 rounded' onClick={() => dialog('Success')} classes='mt-0 hover:bg-gray-700'>Success</Button>
      </div>}
    </Box>

    <Box className='h-20 w-full max-w-4xl flex flex-row items-center gap-8'>
      <TextField
        className='grow'
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        variant='outlined'
        size='small'
      />

      <IconButton
        Icon={Send}
        onClick={() => dialog()}
        disabled={text.length === 0}
        buttonClass='w-6'
      />
    </Box>
  </Box>
}

export default Chat
