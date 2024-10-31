import './App.css';
import Header from './components/header';
import UserTag from './components/userdata';

function App(){
  return(
    <>
    <Header />
    <h1>Thisal Karunarathna</h1>
    <UserTag name="thisal" img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4FZRP5ugy_IOfnRRkOiIBV55SMYMEmX592gtArK73r5kYe9UjnChqPhrJm86Iz_hjJbs&usqp=CAU"/>
    </>
  )
}

export default App;