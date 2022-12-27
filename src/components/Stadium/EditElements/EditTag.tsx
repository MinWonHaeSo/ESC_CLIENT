import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { addTags, removeTags } from '@/store/stadiumWriteSlice';
import useThrottleRef from '@/hooks/useThrottleRef';
import { typo } from '@/lib/styles/typo';
import palette from '@/lib/styles/palette';
import Input from '@/components/common/atoms/Input';
import Tag from '@/components/Tag/Tag';

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

  const intervallCall = useThrottleRef(() => handleAddTags());

  const handleEnterTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      intervallCall();
      e.preventDefault();
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
      <Tag tags={tags} onTagClick={handleRemoveTag} />
    </EditTagContainer>
  );
};

const EditTagContainer = styled.div`
  & > span {
    font-size: ${typo.micro};
    color: ${palette.grey[400]};
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
