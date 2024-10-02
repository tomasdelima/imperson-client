import { useEffect, useState } from 'react'
import { useAudioRecorder } from 'react-audio-voice-recorder'

import IconButton from './IconButton'
import { Box, TextField } from '@mui/material'

import { ArrowBack, Cached, Delete, FiberManualRecord, Stop } from '@mui/icons-material'

import destroy from '../utils/destroy.js'
import post from '../utils/post.js'

const Chat = ({ transcribe, messages, setMessages, activeNpc, setAutoPlay }) => {
  const [transcribeLoading, setTranscribeLoading] = useState(false)
  const [speechLoading, setSpeechLoading] = useState(false)
  const [canceled, setCanceled] = useState(true)
  const { startRecording, stopRecording, isRecording, recordingBlob } = useAudioRecorder()

  const loading = transcribeLoading || speechLoading
  const lastMessage = messages[messages.length - 1]

  const click = () => {
    if (!isRecording) {
      setCanceled(false)
      startRecording()
    } else {
      stopRecording()
    }
  }

  const cancel = () => {
    if (!isRecording) return

    stopRecording()
    setCanceled(true)
  }

  const undo = async () => {
    if (loading) return
    if (isRecording) return
    if (messages.length < 2) return

    await destroy(`messages/${messages[messages.length - 1].id}`)

    if (messages[messages.length - 2]?.role === 'user') {
      await destroy(`messages/${messages[messages.length - 2].id}`)
      setMessages(messages.slice(0, -2))
    } else {
      setMessages(messages.slice(0, -1))
    }
  }

  const regenerate = async () => {
    if (speechLoading) return
    if (lastMessage.role === 'system') return

    setSpeechLoading(true)
    setAutoPlay(true)
    const slicedMessages = messages.slice(0, lastMessage.role === 'assistant' ? -1 : Infinity)
    setMessages(slicedMessages)

    const message = await post(`npcs/${activeNpc.id}/regenerate`)

    setSpeechLoading(false)
    setMessages([...slicedMessages, message])
  }

  useEffect(() => {
    if (recordingBlob && !canceled && activeNpc?.id) transcribe(recordingBlob)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recordingBlob])

  useEffect(() => {
    setAutoPlay(false)
  }, [activeNpc])

  return <Box className="buttons-container flex flex-row justify-center items-center gap-16">
    <IconButton Icon={ArrowBack} onClick={undo} disabled={loading || isRecording || messages.length === 0} buttonClass="w-8" />
    <IconButton Icon={isRecording ? Stop : FiberManualRecord} onClick={click} disabled={loading || messages[messages.length - 1]?.role === 'user'} buttonClass="w-16 h-16" />
    <IconButton Icon={isRecording ? Delete : Cached} onClick={isRecording ? cancel : regenerate} disabled={loading} buttonClass="w-8" />
  </Box>
}

export default Chat
