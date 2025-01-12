import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SwipeCards from './component/SwipeCards'
import Simple from './component/Simple'
import { CgProfile } from 'react-icons/cg'
import { DragCloseDrawerExample } from './component/popup'
import MatchPopup from './component/matchPopUp'

function App() {
  const [count, setCount] = useState(0)
  const [match, setMatch] = useState(true)

  // if(count===5){
  //   setMatch(true);
  // }

  return (
<div style={{display:"flex",direction:"column"}}>
<h1>Student Housing</h1>
<Simple setCount={setCount} />
{count==5 &&<MatchPopup isMatch={match} />}
</div>
  )
}

export default App
// <CgProfile style={{display:"inline"}} size={50}></CgProfile>