import React from 'react';
import Cell from './Cell';

const Row = ({ row, play }) => {
  return (
    <tr>
      {row.map((cell, i) => (<Cell key={i} value={cell} columnIndex={i} play={play}></Cell>))}
    </tr>
  );
};

export default Row;
