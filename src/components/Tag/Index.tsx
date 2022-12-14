import React from 'react';
import styled from '@emotion/styled';
import TagItem from './TagItem';

interface TagProps {
  tags: string[];
  onTagClick?: (id: number) => void;
}

const Tag = ({ tags, onTagClick }: TagProps) => {
  return (
    <TagContainer>
      {tags.map((tag, idx) => (
        <TagItem key={`${tag}_${idx}`} id={idx} title={tag} onTagClick={onTagClick} />
      ))}
    </TagContainer>
  );
};

const TagContainer = styled.ul`
  display: flex;
  width: 280px;
  gap: 0.5rem;
  margin-top: 1rem;
  flex-wrap: wrap;
`;

export default Tag;
