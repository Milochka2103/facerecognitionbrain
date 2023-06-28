import React from 'react'

export const Rank = ( {name, entries}) => {
  return (
    <div>
      <div className="white f3">{`${name}, your current entry count is ${entries}`}</div>
    </div>
  );
}