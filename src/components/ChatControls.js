import { useEffect, useState } from 'react'
import { useAudioRecorder } from 'react-audio-voice-recorder'

import IconButton from './IconButton'
import { Avatar, Box, Button, Tooltip, Typography } from '@mui/material'

import { ArrowBack, Cached, Delete, FiberManualRecord, Stop } from '@mui/icons-material'

import destroy from '../utils/destroy.js'
import post from '../utils/post.js'

const Chat = ({
  activeNpc,
  loading,
  messages,
  setAutoPlay,
  setMessages,
  setNpcForm,
  setSpeechLoading,
  transcribe,
}) => {
  const [canceled, setCanceled] = useState(true)
  const { startRecording, stopRecording, isRecording, recordingBlob } = useAudioRecorder()

  const lastMessage = messages[messages.length - 1]

  const record = () => {
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
    if (loading) return
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

  const undoDisabled = loading || isRecording || messages.length === 0
  const recordDisabled = loading || messages[messages.length - 1]?.role === 'user'

  useEffect(() => {
    setAutoPlay(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeNpc])

  if (!activeNpc) return null

  return <Box className='flex justify-between items-center h-24 z-10 border-b px-4'>
    <Box className='flex items-center'>
      <Avatar src={activeNpc.portrait} className='!h-16 !w-16 m-4' />

      <Tooltip title='Edit'>
        <Button onClick={() => setNpcForm(activeNpc)}>
          <Typography className='grow text-left' variant='caption1'>
            {activeNpc.name}
          </Typography>
        </Button>
      </Tooltip>
    </Box>

    <Box className="flex flex-row justify-center items-center gap-4">
      <IconButton Icon={ArrowBack} onClick={undo} disabled={undoDisabled} tooltip='Undo' />
      {isRecording ? <>
        <IconButton Icon={Stop} onClick={record} tooltip='Stop' />
        <IconButton Icon={Delete} onClick={cancel} disabled={loading} tooltip='Cancel' />
      </> : <>
        <IconButton Icon={FiberManualRecord} onClick={record} disabled={recordDisabled} tooltip='Record' />
        <IconButton Icon={Cached} onClick={regenerate} disabled={loading} tooltip='Regenerate last message' />
      </>}
    </Box>
  </Box>
}

export default Chat
