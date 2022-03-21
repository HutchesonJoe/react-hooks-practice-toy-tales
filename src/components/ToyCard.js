import React from "react";

function ToyCard({toy, handleDonate, addLike}) {
  function handleLike(){
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        likes : toy.likes + 1
      })
    })
      .then(r=>r.json())
      .then(data=>addLike(data))
  }

  return (
    <div className="card" id={toy.id}>
      <h2>{toy.name}</h2>
      <img
        src={toy.image}
        alt={toy.name}
        className="toy-avatar"
      />
      <p>{toy.likes} Likes</p>
      <button className="like-btn" onClick={handleLike}>Like</button>
      <button className="del-btn" onClick={handleDonate}>Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
