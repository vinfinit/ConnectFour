import React from 'react';

const Cell = ({ value, columnIndex, play }) => {
  return (
    <td className={'player_' + value} onClick={
      (event) => {
        if (event.altKey) {
          return play(columnIndex, true)
        }
        play(columnIndex)
      }}>
      <div>{value}</div>
    </td>
  );
};

export default Cell;
