import styled from '@emotion/styled';
import React from 'react';
import Tag from '../Tag';

interface TagListProps {
  tags: string[];
  onTagClick?: (id: number) => void;
}

const TagList = ({ tags, onTagClick }: TagListProps) => {
  return (
    <TagListContainer>
      {tags.map((tag, idx) => (
        <Tag id={idx} title={tag} onTagClick={onTagClick} />
      ))}
    </TagListContainer>
  );
};

const TagListContainer = styled.ul`
  display: flex;
  gap: 0.2rem;
  margin-top: 1rem;
`;

export default TagList;
