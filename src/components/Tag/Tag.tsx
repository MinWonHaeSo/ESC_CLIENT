import styled from '@emotion/styled';
import React from 'react';
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
  gap: 0.5rem;
  margin-top: 1rem;
`;

export default Tag;
