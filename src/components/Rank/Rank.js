import React from "react";


const Rank = ({ name, entries}) => {
  return (
 <div>     
        <div className="white f3">
        {`${name}, you have blocked this many faces...`}

        </div>
        <div className="white f1">
        {`${entries}`}

        </div>
 </div>
  )
}

export default Rank;