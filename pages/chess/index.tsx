import {NextPage} from 'next'
import FormComponent from '../../components/form/FormComponent'
const ChessIndex: NextPage = () => {
  return (
    <section className={"full-width full-height flex-center"}>
      <FormComponent>
        <input type="text" placeholder="Room"/>
        <button>Join Room</button>
        <p>or</p>
        <button>New Game</button>
      </FormComponent>
    </section>
  )
}

export default ChessIndex