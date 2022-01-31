import {NextPage} from 'next'
import FormComponent from '../../components/form/FormComponent'
import {ChangeEvent, useState, MouseEvent, useEffect} from 'react'
import SocketService from '../../core/services/SocketService'
const ChessIndex: NextPage = () => {
  const [room, setRoom] = useState("")

  useEffect(() => {
    SocketService.listen('connect', ()=>console.log('connected'))
  })
  const handleJoinRoomButton = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log(room)
    SocketService.emit('joinGame', room, (response: any)=>{
      if (response.status == 'ok') {

      }
    })
  }
  const handleRoomInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRoom(event.target.value)
  }
  const handleNewGameButton = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log('handleNewGameButton')
    SocketService.emit('newGame', 'CHESS')
  }
  return (
    <section className={"full-width full-height flex-center"}>
      <FormComponent>
        <input type="text" placeholder="Room" onChange={(event) => handleRoomInputChange(event)}/>
        <button onClick={(event)=>handleJoinRoomButton(event)}>Join Room</button>
        <p>or</p>
        <button onClick={(event)=>handleNewGameButton(event)}>New Game</button>
      </FormComponent>
    </section>
  )
}

export default ChessIndex