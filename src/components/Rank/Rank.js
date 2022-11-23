import React from "react";

const Rank = ({ name, entries }) => {
  return (
    <div>
      <div className="f3">
        {`${name}, the number of entries you made is...`}
      </div>
      <div className="f1">
        {entries}
      </div>
    </div>
  );
};

export default Rank;