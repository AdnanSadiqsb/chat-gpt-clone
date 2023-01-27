import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react'
function App() {
  const [input, setInput]=useState("")
  const [chatLog, setChatLog]=useState([{
    user:"gpt",
    message:"how i help you"
  }])
  async function submitHandler(e){
    e.preventDefault();
    setChatLog(chatLog=>[...chatLog,{user:"me",message:input}])
      // fetch response to api
  const response=await fetch("http://localhost:4000/chatgpt",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      message:input
    })
  });
  setInput("")
  const data=await response.json()
  console.log(data)
  setChatLog(chatLog=>[...chatLog,{user:"gpt",message:`${data.message}`}])
  }

  return (
    <>
   
    <div className="App">
      <aside className='sidemenu'>
        <div className='side-menu-button' onClick={()=>setChatLog([])}>
          <span>+</span>
          New Chat
        </div>
      </aside>
      <section  className='chatbox'>
        <div className="chat-console">

        
        <div className="chat-log">
    
          {
            chatLog.map((message, index)=>(

              <ChatMessage key={index} count={index+1} message={message}/>
            ))
          }

        </div>
   
        </div>
        <div className="chat-input-holder">
          <form onSubmit={submitHandler}>

          <input className='chat-input-textarea'  placeholder='Type your message here' value={input} onChange={(e)=>setInput(e.target.value)}></input>
          </form>
        </div>
      </section>
    </div>
     </>
  );
}
const ChatMessage=({message,count})=>{
  var newMessage=message.message.replaceAll('\n', '<br>')
  return(
    <div className={` chat-message ${message.user==='gpt'?'log-reply':'' }`}>
          <div className='outer-avatar'>

            <div className={`avatar ${message.user==='gpt'?'gpt-user':'' }`} style={{'color':'black'}}>
              {count}
          </div>
            </div>
            <div className="message" dangerouslySetInnerHTML={{__html: newMessage}} >
              

            </div>
    </div>

    
  )
}
export default App;
