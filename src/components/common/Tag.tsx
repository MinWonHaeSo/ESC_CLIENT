import React from 'react';
import styled from '@emotion/styled';
import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';

type TagProps = {
  id?: number;
  title: string;
  onTagClick?: (id: number) => void;
};

const Tag = ({ id, title, onTagClick = () => {} }: TagProps) => {
  return (
    <TagContainer onClick={() => onTagClick(id!)}>
      <span># {title}</span>
    </TagContainer>
  );
};

const TagContainer = styled.li`
  padding: 0.2rem 0.5rem;
  border-radius: 10px;
  background-color: ${palette.primary.orange};

  span {
    font-size: ${typo.micro};
    color: #fff;
  }
`;

export default Tag;
