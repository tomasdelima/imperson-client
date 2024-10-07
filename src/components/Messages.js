import { useEffect } from 'react'

import { Box, Button } from '@mui/material'
import Loading from './Loading.js'
import Message from './Message.js'

const Messages = ({ autoPlay, dialog, messages, speechLoading, transcribeLoading }) => {
  const lastMessage = messages[messages.length - 1]
  const showReplyButtons = lastMessage?.ask_for_check && lastMessage?.role === 'assistant'
  const loading = transcribeLoading || speechLoading

  useEffect(() => {
    const element = document.getElementsByClassName('messages-wrapper')[0]
    element.scrollTo({ top: element.scrollHeight, behavior: 'smooth' })
  }, [messages])

  return <Box
    sx={{ scrollbarColor: '#0002 transparent', scrollbarWidth: 'thin' }}
    className='messages-wrapper absolute top-24 bottom-0 left-0 right-0 overflow-x-scroll flex flex-col gap-4 py-4 px-8'
  >
    {messages.map((item, index) =>
      <Message
        key={index}
        item={item}
        autoPlay={autoPlay}
      />
    )}

    {showReplyButtons && <Box className='flex flex-row justify-end self-stretch gap-8'>
      <Button className='px-4 py-2 rounded' onClick={() => dialog('Failure')}>Failure</Button>
      <Button className='px-4 py-2 rounded' onClick={() => dialog('Success')}>Success</Button>
    </Box>}

    {loading && <Box className={transcribeLoading && 'flex justify-end'}>
      <Loading />
    </Box>}
  </Box>
}

export default Messages
