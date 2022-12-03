import Input from '@/components/common/atoms/Input';
import Tag from '@/components/common/Tag';
import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import styled from '@emotion/styled';
import React, { useState } from 'react';

type Props = {};

const StardiumEditTag = (props: Props) => {
  const [tagText, setTagText] = useState('');
  const [tagList, setTagList] = useState<string[]>([]);

  const handleAddTags = () => {
    if (tagText === '') return;

    if (tagList.length === 5) {
      alert('최대 5개 가능.');
      setTagText('');
      return;
    }

    setTagList([...tagList, tagText]);
    setTagText('');
  };

  const handleEnterTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTags();
    }
  };

  const handleRemoveTag = (id: number) => {
    const filterTagList = tagList.filter((tag, idx) => id !== idx);

    setTagList(filterTagList);
  };
  return (
    <StardiumEditTagContainer>
      <span>최대 5개 등록 가능합니다.</span>
      <label htmlFor="stardiumTags">체육관 종목 태그</label>
      <Input
        type="text"
        id="stardiumTags"
        placeholder="체육관 종목 태그"
        // value={tagText}
        // onChange={e => setTagText(e.target.value)}
        // onKeyUp={handleEnterTag}
      />
      <button type="button" className="tag-add-btn" onClick={handleAddTags}>
        태그 추가
      </button>
      <ul>
        {tagList.length !== 0 &&
          tagList.map((tag, idx) => <Tag key={idx} id={idx} title={tag} onClick={handleRemoveTag} />)}
      </ul>
    </StardiumEditTagContainer>
  );
};

const StardiumEditTagContainer = styled.div`
  & > span {
    font-size: ${typo.micro};
    color: ${palette.grey[400]};
  }

  & > ul {
    display: flex;
    gap: 0.2rem;

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

export default StardiumEditTag;
