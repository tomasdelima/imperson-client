import { useEffect, useState } from 'react'
import { useAudioRecorder } from 'react-audio-voice-recorder'

import Message from './Message'
import IconButton from './IconButton'
import Back from './Back'
import Play from './Play'
import Trash from './Trash'
import Send from './Send'
import Stop from './Stop'
import destroy from '../utils/destroy.js'
import post from '../utils/post.js'

const Chat = ({ activeNpc, messages, setMessages }) => {
  const [loading, setLoading] = useState(false)
  const [canceled, setCanceled] = useState(true)
  const [autoPlay, setAutoPlay] = useState(false)
  const [text, setText] = useState('')
  const { startRecording, stopRecording, isRecording, recordingBlob } = useAudioRecorder()

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

  const undo = () => {
    if (loading) return
    if (isRecording) return
    if (messages.length < 2) return

    setLoading(true)
    messages.slice(-2).map(item => item.id && destroy(`messages/${item.id}`))
    setLoading(false)
    setMessages(messages.slice(0, -2))
  }

  const talk = async () => {
    if (loading) return

    setLoading(true)
    const formData = new FormData()
    formData.append('audio_data', recordingBlob, 'file')
    formData.append('type', 'webm')

    const data = await post(`npcs/${activeNpc.id}/talk`, formData, {
      setContentType: false,
      stringifyBody: false,
    })

    setLoading(false)
    setAutoPlay(true)
    setMessages([...messages, ...data])
  }

  const dialog = async () => {
    if (text.length === 0) return
    if (loading) return

    setLoading(true)

    const data = await post(`npcs/${activeNpc.id}/dialog`, { text })

    setLoading(false)
    setText('')
    setAutoPlay(true)
    setMessages([...messages, ...data])
  }

  useEffect(() => {
    if (recordingBlob && !canceled && activeNpc?.id) talk()
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
      <IconButton Icon={Back} onClick={undo} disabled={loading || isRecording || messages.length === 0} buttonClass="w-8" />
      <IconButton Icon={isRecording ? Stop : Play} onClick={click} disabled={loading} buttonClass="w-16" />
      <IconButton Icon={Trash} onClick={cancel} disabled={loading || !isRecording} buttonClass="w-8" />
    </div>

    <div className="messages-wrapper pr-6 w-full h-[65vh] overflow-y-scroll flex justify-center">
      <div className="flex flex-grow flex-col">
        <div className="flex flex-grow flex-col justify-end items-stretch gap-8">
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

    <div className="flex flex-row items-center self-stretch gap-8">
      <input
        className="m-1 px-2 py-1 grow text-[#282c34]"
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={handleKeyDown}
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
