import { useEffect, useState } from 'react'

import { Box, Paper, TextField } from '@mui/material'
import ChatControls from '../components/ChatControls.js'
import ChooseNpc from '../components/ChooseNpc.js'
import IconButton from '../components/IconButton.js'
import Messages from '../components/Messages'
import TopBar from '../components/TopBar'

import Send from '@mui/icons-material/Send'

import get from '../utils/get.js'
import post from '../utils/post.js'

const Chat = () => {
  const [activeNpc, setActiveNpc] = useState(null)
  const [autoPlay, setAutoPlay] = useState(false)
  const [messages, setMessages] = useState([])
  const [npcForm, setNpcForm] = useState({})
  const [npcs, setNpcs] = useState([])
  const [speechLoading, setSpeechLoading] = useState(false)
  const [text, setText] = useState('')
  const [transcribeLoading, setTranscribeLoading] = useState(false)

  const loading = transcribeLoading || speechLoading

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

  return <Box className='h-full flex'>
    <Box className='h-full w-1/2 md:w-1/3 lg:w-1/4 relative'>
      <TopBar />

      <ChooseNpc
        activeNpc={activeNpc}
        fetchNpcs={fetchNpcs}
        npcForm={npcForm}
        npcs={npcs}
        setActiveNpc={setActiveNpc}
        setMessages={setMessages}
        setNpcForm={setNpcForm}
        setNpcs={setNpcs}
      />
    </Box>

    <Box className='grow h-full relative flex flex-col justify-between items-stretch mr-8'>
      <Paper elevation={4} className='grow h-full relative mt-8'>
        <ChatControls
          activeNpc={activeNpc}
          loading={loading}
          messages={messages}
          setAutoPlay={setAutoPlay}
          setMessages={setMessages}
          setNpcForm={setNpcForm}
          setSpeechLoading={setSpeechLoading}
          transcribe={transcribe}
        />

        <Messages 
          autoPlay={autoPlay} 
          dialog={dialog} 
          messages={messages} 
          loading={loading} 
          speechLoading={speechLoading}
          transcribeLoading={transcribeLoading}
        />
      </Paper>

      <Box className='h-32 w-full flex flex-row items-center gap-8 bg-stone-100'>
        <TextField
          className='grow bg-white rounded'
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
  </Box>
}

export default Chat
