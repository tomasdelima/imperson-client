import { useEffect, useState } from 'react'
import { useAudioRecorder } from 'react-audio-voice-recorder'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import IconButton from './IconButton'
import Loading from './Loading'
import Message from './Message'

import ArrowBack from '@mui/icons-material/ArrowBack'
import Cached from '@mui/icons-material/Cached'
import Delete from '@mui/icons-material/Delete'
import FiberManualRecord from '@mui/icons-material/FiberManualRecord'
import Send from '@mui/icons-material/Send'
import Stop from '@mui/icons-material/Stop'

import destroy from '../utils/destroy.js'
import post from '../utils/post.js'

const Chat = ({ activeNpc, messages, setMessages }) => {
  const [transcribeLoading, setTranscribeLoading] = useState(false)
  const [speechLoading, setSpeechLoading] = useState(false)
  const [canceled, setCanceled] = useState(true)
  const [autoPlay, setAutoPlay] = useState(false)
  const [text, setText] = useState('')
  const { startRecording, stopRecording, isRecording, recordingBlob } = useAudioRecorder()

  const loading = transcribeLoading || speechLoading

  const click = () => {
    if (!isRecording) {
      setCanceled(false)
      startRecording()
    } else {
      stopRecording()
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      dialog()
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

  const reason = async () => {
    if (speechLoading) return

    setSpeechLoading(true)
    setAutoPlay(true)

    const message = await post(`npcs/${activeNpc.id}/reason`)

    setSpeechLoading(false)
    return message
  }

  const transcribe = async () => {
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

  const lastMessage = messages[messages.length - 1]
  const showReplyButtons = lastMessage?.ask_for_check && lastMessage?.role === 'assistant'

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
    if (recordingBlob && !canceled && activeNpc?.id) transcribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recordingBlob])

  useEffect(() => {
    const element = document.getElementsByClassName('messages-wrapper')[0]
    element.scrollTo({ top: element.scrollHeight, behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    setAutoPlay(false)
  }, [activeNpc])

  let wrapperClass = 'flex flex-col items-center flex-grow gap-6 max-w-6xl 2xl:w-3/6 lg:w-4/6 md:w-5/6 w-full px-8 self-center '
  wrapperClass += activeNpc?.id ? 'opacity-1' : 'opacity-0'

  return <div className={wrapperClass}>
    <div className="buttons-container flex flex-row justify-center items-center gap-16">
      <IconButton Icon={ArrowBack} onClick={undo} disabled={loading || isRecording || messages.length === 0} buttonClass="w-8" />
      <IconButton Icon={isRecording ? Stop : FiberManualRecord} onClick={click} disabled={loading || messages[messages.length - 1]?.role === 'user'} buttonClass="w-16 h-16" />
      <IconButton Icon={isRecording ? Delete : Cached} onClick={isRecording ? cancel : regenerate} disabled={loading} buttonClass="w-8" />
    </div>

    <div className={'messages-wrapper pr-6 w-full overflow-y-scroll flex justify-center ' + (showReplyButtons ? 'h-[52vh]' : 'h-[60vh]')}>
      <div className="flex flex-grow flex-col">
        <div className="flex flex-grow flex-col justify-end items-stretch">
          {messages.map((item, index) =>
            <Message
              key={index}
              item={item}
              autoPlay={autoPlay}
            />
          )}

          {(transcribeLoading || speechLoading) && <div className={transcribeLoading && 'flex justify-end'}>
            <Loading />
          </div>}
        </div>
      </div>
    </div>

    {showReplyButtons && <div className="flex flex-row justify-end self-stretch gap-8">
      <Button className='bg-gray-700 px-4 py-2 rounded' onClick={() => dialog('Failure')} label='Failure' classes='mt-0 hover:bg-gray-700' />
      <Button className='bg-gray-700 px-4 py-2 rounded' onClick={() => dialog('Success')} label='Success' classes='mt-0 hover:bg-gray-700' />
    </div>}
    <div className="flex flex-row items-center self-stretch gap-8">
      <TextField
        sx={{ flexGrow: 1 }}
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        variant='outlined'
        size='small'
      />

      <IconButton
        Icon={Send}
        onClick={dialog}
        disabled={text.length === 0 || loading}
        buttonClass="w-6"
      />
    </div>
  </div>
}

export default Chat
