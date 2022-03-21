import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({toyList, handleDonate, addLike}) {
  let thisToyList = toyList.map(toy=><ToyCard toy={toy} key = {toy.id} handleDonate={handleDonate} toyList={toyList} addLike={addLike}
    />)
  return (
    <div id="toy-collection">{thisToyList}</div>
  );
}

export default ToyContainer;
