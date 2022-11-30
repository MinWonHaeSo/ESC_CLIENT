import React from 'react';

type TagProps = {
  id: number;
  title: string;
  onClick?: (id: number) => void;
};

const Tag = ({ id, title, onClick = () => {} }: TagProps) => {
  return (
    <li onClick={() => onClick(id)}>
      <span>#{title}</span>
    </li>
  );
};

export default Tag;
