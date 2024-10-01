import { useState, useRef } from 'react'
import ReactAudioPlayer from 'react-audio-player'

import IconButton from './IconButton'

import Play from '@mui/icons-material/PlayArrow'
import Stop from '@mui/icons-material/Stop'

const Message = ({ item, autoPlay }) => {
  const[playing, setPlaying] = useState(autoPlay)
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

  const isAssistant = item.role === 'assistant'
  let wrapperClass = 'max-w-6xl w-5/6 break-words flex items-center gap-4 mb-8 '
  wrapperClass += isAssistant ? 'flex-row self-start' : 'flex-row-reverse self-end'

  let durationsClass = 'text-sm whitespace-nowrap absolute top-full '
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
      <div className="flex items-center gap-2">
        {item.content}
      </div>
      {durations && hover && <div className={durationsClass}>
        ({durations})
      </div>}
    </div>
  </div>
}

export default Message