import React, { useEffect, useState, useMemo } from 'react'

import Message from './Message'
import IconButton from './IconButton'
import Back from './Back'
import Play from './Play'
import Trash from './Trash'
import Stop from './Stop'
import { useAudioRecorder } from 'react-audio-voice-recorder'

const Chat = ({ activeNpc, messages, setMessages }) => {
  const [canceled, setCanceled] = useState(true)
  const [autoPlay, setAutoPlay] = useState(false)
  const { startRecording, stopRecording, isRecording, recordingBlob } = useAudioRecorder()

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

  const undo = () => {
    if (isRecording) return

    setMessages({ ...messages, [activeNpc.id]: messages.slice(0, -1) })
  }

  const post = async () => {
    const formData = new FormData()
    formData.append('npc',activeNpc.id)
    formData.append('ping', false)
    formData.append('silent', true)
    formData.append('audio_data', recordingBlob, 'file')
    formData.append('type', 'webm')

    const response = await fetch(`${window.env.API_URL}/npcs/${activeNpc.id}/talk`, {
      method: 'POST',
      body: formData
    })

    const data = await response.json()

    if (data) {
      setAutoPlay(true)
      setMessages([...messages, ...data])
    }
  }

  useEffect(() => {
    if (recordingBlob && !canceled && activeNpc?.id) post()
  }, [recordingBlob])

  useEffect(() => {
    const element = document.getElementsByClassName('messages-wrapper')[0]
    element.scrollTo({ top: element.scrollHeight, behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    setAutoPlay(false)
  }, [activeNpc])

  let wrapperClass = 'flex flex-col items-center flex-grow gap-4 '
  wrapperClass += activeNpc?.id ? 'opacity-1' : 'opacity-0'

  return <div className={wrapperClass}>
    <div className="buttons-container flex flex-row justify-center items-center gap-16 ">
      <IconButton Icon={Back} onClick={undo} disabled={isRecording || messages.length == 0} />
      <IconButton Icon={isRecording ? Stop : Play} onClick={click} buttonClass="w-16" />
      <IconButton Icon={Trash} onClick={cancel} disabled={!isRecording} />
    </div>

    <div className="messages-wrapper w-full h-[70vh] overflow-y-scroll flex justify-center container">
      <div className="flex-grow">
        <div className="flex flex-col justify-end items-stretch gap-8 my-16 mx-8">
          {messages.map((item, index) =>
            <Message
              key={index}
              item={item}
              autoPlay={autoPlay}
            />
          )}
        </div>
      </div>
    </div>
  </div>
}

export default Chat
