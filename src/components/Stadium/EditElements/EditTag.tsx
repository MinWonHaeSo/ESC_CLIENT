import Input from '@/components/common/atoms/Input';
import Tag from '@/components/common/Tag';
import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import { addTags, removeTags } from '@/store/stadiumWriteSlice';
import styled from '@emotion/styled';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

interface EditTagProps {
  tags: string[];
}

const EditTag = ({ tags }: EditTagProps) => {
  const [tagText, setTagText] = useState('');
  const dispatch = useDispatch();

  const handleAddTags = () => {
    if (tagText === '') return;

    if (tags.length === 5) {
      alert('최대 5개 가능 합니다.');
      setTagText('');
      return;
    }

    dispatch(addTags(tagText));
    setTagText('');
  };

  const handleEnterTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTags();
    }
  };

  const handleRemoveTag = useCallback(
    (id: number) => {
      dispatch(removeTags(id));
    },
    [dispatch],
  );

  return (
    <EditTagContainer>
      <label htmlFor="stadiumTags">체육관 종목 태그</label>
      <span>최대 5개 등록 가능합니다.</span>
      <Input
        type="text"
        id="stadiumTags"
        placeholder="체육관 종목 태그"
        value={tagText}
        onChange={e => setTagText(e.target.value)}
        onKeyDown={handleEnterTag}
      />
      <button type="button" className="tag-add-btn" onClick={handleAddTags}>
        태그 추가
      </button>
      <ul>
        {tags.length !== 0 && tags.map((tag, idx) => <Tag key={idx} id={idx} title={tag} onClick={handleRemoveTag} />)}
      </ul>
    </EditTagContainer>
  );
};

const EditTagContainer = styled.div`
  & > span {
    font-size: ${typo.micro};
    color: ${palette.grey[400]};
  }

  & > ul {
    display: flex;
    gap: 0.2rem;
    margin-top: 1rem;

    li {
      padding: 0.2rem 0.5rem;
      border-radius: 10px;
      background-color: ${palette.primary.orange};

      span {
        font-size: ${typo.micro};
        color: #fff;
      }
    }
  }

  .tag-add-btn {
    width: 280px;
    height: 50px;
    margin-top: 0.5rem;
    border-radius: 10px;
    background-color: ${palette.primary.green};
    color: #fff;
  }
`;

export default React.memo(EditTag);
