import React from 'react';
import styled from '@emotion/styled';
import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';

type TagItemProps = {
  id?: number;
  title: string;
  onTagClick?: (id: number) => void;
};

const TagItem = ({ id, title, onTagClick = () => {} }: TagItemProps) => {
  return (
    <TagItemContainer onClick={() => onTagClick(id!)}>
      <span># {title}</span>
    </TagItemContainer>
  );
};

const TagItemContainer = styled.li`
  display: flex;
  align-items: center;
  padding: 0.3rem 0.5rem;
  border-radius: 10px;
  background-color: ${palette.primary.orange};

  span {
    font-size: ${typo.micro};
    color: #fff;
  }
`;

export default TagItem;
