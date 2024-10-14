import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Box, Divider, Paper } from '@mui/material'
import ChatControls from '../components/ChatControls.js'
import ChooseNpc from '../components/ChooseNpc.js'
import DialogInput from '../components/DialogInput.js'
import Messages from '../components/Messages'
import NoNpcSelected from '../components/NoNpcSelected.js'
import TopBar from '../components/TopBar'

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
  const navigate = useNavigate()
  const { id } = useParams()

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
    setActiveNpc(npcs.find(n => ('' + n.id) === id) || null)
  }, [npcs, id])

  useEffect(() => {
    fetchMessages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeNpc])

  useEffect(() => {
    const element = document.getElementsByClassName('messages-wrapper')[0]
    element?.scrollTo({ top: element.scrollHeight, behavior: 'smooth' })
  }, [messages])

  let leftColumnClass = 'h-full w-1/2 md:w-1/3 max-w-lg relative'
  let rightColumnClass = 'grow h-full relative flex flex-col justify-between items-stretch lg:mr-4'
  if (activeNpc) {
    leftColumnClass += ' hidden lg:block'
  } else {
    rightColumnClass += ' hidden lg:block'
  }

  return <Box className='h-full flex'>
    <Box className={leftColumnClass}>
      <TopBar />

      <ChooseNpc
        activeNpc={activeNpc}
        fetchNpcs={fetchNpcs}
        npcForm={npcForm}
        npcs={npcs}
        setMessages={setMessages}
        setNpcForm={setNpcForm}
        setNpcs={setNpcs}
      />
    </Box>

    <Box className={rightColumnClass}>
      {activeNpc ? <>
        <Paper elevation={4} className='grow h-full relative lg:mt-4'>
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

          <Divider />

          <Messages
            autoPlay={autoPlay}
            dialog={dialog}
            messages={messages}
            loading={loading}
            speechLoading={speechLoading}
            transcribeLoading={transcribeLoading}
          />
        </Paper>

        <DialogInput
          dialog={dialog}
          text={text}
          setText={setText}
        />
      </> : <NoNpcSelected npcs={npcs} setNpcForm={setNpcForm} />}
    </Box>
  </Box>
}

export default Chat
