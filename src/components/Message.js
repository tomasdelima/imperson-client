import { useState, useRef } from 'react'
import ReactAudioPlayer from 'react-audio-player'

import IconButton from './IconButton'
import Play from './Play'
import Stop from './Stop'

const Message = ({ item, autoPlay }) => {
  const[playing, setPlaying] = useState(false)
  const[hover, setHover] = useState(false)
  const ref = useRef(null)

  const play = () => {
    setPlaying(true)
    ref.current.audioEl.current.currentTime = 0
    ref.current.audioEl.current.play()
  }

  const stop = () => {
    setPlaying(false)
    ref.current.audioEl.current.pause()
  }

  let wrapperClass = 'max-w-6xl break-words flex items-center gap-4 mb-8 '
  wrapperClass += item.role === 'user' ? 'flex-row-reverse self-end' : 'flex-row self-start'

  const isAssistant = item.role === 'assistant'

  let durationsClass = 'text-sm text-gray-500 whitespace-nowrap absolute top-full '
  durationsClass += isAssistant ? 'left-0' : 'right-0'

  const durations = [
    item.transcription_duration,
    item.reason_duration,
    item.speech_duration
  ].filter((duration) => duration).map((duration) => `${Math.round(duration * 10) / 10}s`).join(' | ')

  return <div
    className={wrapperClass}
    onMouseEnter={() => setHover(true)}
    onMouseLeave={() => setHover(false)}
  >
    {item.audio_url && isAssistant && <>
      <ReactAudioPlayer
        src={item.audio_url}
        autoPlay={autoPlay}
        onEnded={() => setPlaying(false)}
        ref={ref}
      />
      {playing || <IconButton Icon={Play} onClick={play} buttonClass="w-4 h-5 shrink-0" />}
      {playing && <IconButton Icon={Stop} onClick={stop} buttonClass="w-4 h-5 shrink-0" />}
    </>}
    <div className="relative">
      {item.content}
      {durations && hover && <div className={durationsClass}>
        ({durations})
      </div>}
    </div>
  </div>
}

export default Message