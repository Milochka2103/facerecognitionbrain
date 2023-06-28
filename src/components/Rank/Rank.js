import React from 'react'

export const Rank = ( {name, entries=0}) => {
  return (
    <div>
      <div className="white f3">{`${name}, your current entry count is ${entries}`}</div>
    </div>
  );
}