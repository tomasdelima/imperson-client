import { useEffect, useState } from 'react'
import { useAudioRecorder } from 'react-audio-voice-recorder'
import { useTheme } from '@mui/material'

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
  const { palette } = useTheme()

  const undoDisabled = loading || isRecording || messages.length === 0
  const recordDisabled = loading || messages[messages.length - 1]?.role === 'user'
  const lastMessage = messages[messages.length - 1]

  const record = () => {
    if (recordDisabled) return

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

  const keyPress = (event) => {
    if (event.target.tagName === 'INPUT') return

    if (event.code === 'Space') record()
    if (event.code === 'Escape') cancel()
  }

  useEffect(() => {
    document.addEventListener('keydown', keyPress, false)

    return () => {
      document.removeEventListener('keydown', keyPress, false)
    }
  }, [])

  useEffect(() => {
    setAutoPlay(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeNpc])

  if (!activeNpc) return null

  return <Box
    className='flex justify-between items-center h-24 z-10 pl-4 pr-8'
    sx={{ background: palette.primary.dark }}
  >
    <Box className='flex items-center'>
      <Avatar src={activeNpc.portrait} className='!h-16 !w-16 m-4' />

      <Tooltip title='Edit'>
        <Button onClick={() => setNpcForm(activeNpc)}>
          <Typography className='grow text-left' variant='caption1' color='lightPrimary'>
            {activeNpc.name}
          </Typography>
        </Button>
      </Tooltip>
    </Box>

    <Box className="flex flex-row justify-center items-center gap-4">
      <IconButton icon={ArrowBack} onClick={undo} disabled={undoDisabled} tooltip='Undo' color='lightPrimary' />
      {isRecording ? <>
        <IconButton icon={Stop} onClick={record} tooltip='Stop (Space)' color='error' />
        <IconButton icon={Delete} onClick={cancel} disabled={loading} tooltip='Cancel (Esc)' color='lightPrimary' />
      </> : <>
        <IconButton icon={FiberManualRecord} onClick={record} disabled={recordDisabled} tooltip='Record (Space)' color='error' />
        <IconButton icon={Cached} onClick={regenerate} disabled={loading} tooltip='Regenerate last message' color='lightPrimary' />
      </>}
    </Box>
  </Box>
}

export default Chat
