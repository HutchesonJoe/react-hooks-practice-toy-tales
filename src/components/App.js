import React, { useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toyList, setToyList] = useState([])
  const [newToyName, setNewToyName] = useState("")
  const [newToyImage, setNewToyImage] = useState("")

  useState(()=>{
    fetch("http://localhost:3001/toys")
    .then (r => r.json())
    .then (data => setToyList(data))
  }, [])
  
  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function addLike(data){
    console.log(data.likes)
    let thisToyList = toyList.map(toy => {
      if (toy.id === data.id){
        return {...toy, likes: data.likes}
      } else {return toy}
    })
    setToyList(thisToyList)
  }

  function handleAddToy(e){
    e.preventDefault()
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "name" : newToyName,
        "image" : newToyImage,
        "likes" : 0
      })
    })
      .then(r=>r.json())
      .then(data=>setToyList([...toyList, data]))
  }

  function handleDonate(e){
    fetch(`http://localhost:3001/toys/${e.target.parentNode.id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      }
    })
      const thisToyList = toyList.filter(toy=>toy.id !== parseInt(e.target.parentNode.id))
      console.log(thisToyList)
      setToyList(thisToyList)
  }


  return (
    <>
      <Header />
      {showForm ? <ToyForm handleAddToy={handleAddToy} setNewToyName={setNewToyName} setNewToyImage={setNewToyImage}/> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer 
      toyList = {toyList} 
      handleDonate={handleDonate}
      addLike={addLike}
      />
    </>
  );
}

export default App;
