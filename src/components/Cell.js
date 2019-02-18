import React from 'react';

const Cell = ({ value, columnIndex, play }) => {
  return (
    <td className={'player' + value} onClick={(e) => {play(columnIndex, e)}}>
      <div>{value}</div>
    </td>
  );
};

export default Cell;
