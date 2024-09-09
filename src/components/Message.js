import { useState, useRef } from 'react'
import ReactAudioPlayer from 'react-audio-player'

import IconButton from './IconButton'
import Play from './Play'
import Stop from './Stop'

const Message = ({ item, autoPlay }) => {
  const[playing, setPlaying] = useState(false)
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

  let wrapperClass = 'max-w-6xl break-words flex items-center gap-4 '
  wrapperClass += item.role === 'user' ? 'flex-row-reverse self-end' : 'flex-row self-start'

  return <>
    <div className={wrapperClass}>
      {playing || <IconButton Icon={Play} onClick={play} buttonClass="w-4 h-5 shrink-0" />}
      {playing && <IconButton Icon={Stop} onClick={stop} buttonClass="w-4 h-5 shrink-0" />}
      {item.content}
    </div>
    <ReactAudioPlayer
      src={item.audio_url}
      autoPlay={item.role === 'assistant' && autoPlay}
      onEnded={() => setPlaying(false)}
      ref={ref}
    />
  </>
}

export default Message