import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux';
import { changeStar } from '@/store/stadiumReview';
import { RootState } from '@/store/store';
import palette from '@/lib/styles/palette';
import StarRate from '../common/StarRate';

interface DropDownMenuProps {
  idx: number;
  onClick: () => void;
}

const DropdownMenu = ({ idx, onClick }: DropDownMenuProps) => {
  return (
    <li className="dropdown-option">
      <button className="option-select-btn" onClick={onClick}>
        <StarRate starRating={idx + 1} />
      </button>
    </li>
  );
};

interface ReviewDropdownProps {}

const ReviewDropdown = (props: ReviewDropdownProps) => {
  const { star } = useSelector((state: RootState) => state.stadiumReview);
  const dispatch = useDispatch();
  const [starGradView, setStarGradView] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: any) => {
    if (dropdownRef && !dropdownRef.current!.contains(event.target)) {
      setStarGradView(false);
    } else {
      setStarGradView(true);
    }
  };

  return (
    <DropdownContainer ref={dropdownRef}>
      <button type="button" className="dropdown-toggle">
        {star ? <StarRate starRating={star} /> : '-- 평점을 선택해주세요 --'}
      </button>
      <ul className={`${starGradView ? 'dropdown-menu show' : 'dropdown-menu'}`}>
        {Array.from({ length: 5 }).map((_, idx) => (
          <DropdownMenu
            key={idx}
            idx={idx}
            onClick={() => {
              dispatch(changeStar(idx + 1));
              setStarGradView(false);
            }}
          />
        ))}
      </ul>
    </DropdownContainer>
  );
};

const DropdownContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    background-color: #fff;
    border: none;
    font-size: 12px;
    color: ${palette.grey[400]};
    letter-spacing: -0.02em;
  }

  .dropdown-toggle {
    width: 160px;
    height: 40px;
    padding: 0 16px;
    color: rgba(133, 136, 150, 0.5);
    text-align: left;
    border-radius: 10px;
    border: 1px solid rgba(224, 226, 231, 0.75);
    text-align: center;
    transition: border-color 100ms ease-in;
  }

  .dropdown-menu {
    position: absolute;
    z-index: 2;
    top: calc(100% + 4px);
    left: 0;
    width: 100%;
    max-height: 0;
    overflow: hidden;
    background-color: #fff;
    border: 1px solid transparent;
    border-radius: 6px;
    transition: border-color 200ms ease-in, padding 200ms ease-in, max-height 200ms ease-in, box-shadow 200ms ease-in;
  }

  .dropdown-menu.show {
    padding: 8px 0;
    max-height: 280px;
    border-color: rgba(224, 226, 231, 0.5);
    box-shadow: 0 4px 9px 0 rgba(63, 65, 80, 0.1);
  }

  .dropdown-option {
    width: 100%;
    height: 40px;
    padding: 0 44px;
    line-height: 44px;
    text-align: center;
    align-items: center;
    .option-select-btn {
      letter-spacing: 2px;
      i {
        font-size: 10px;
        color: ${palette.primary.orange};
      }
    }
  }

  li + li {
    border-top: 1px solid ${palette.grey[200]};
  }

  .dropdown-option:hover {
    background-color: #f8f9fa;
  }
`;
export default ReviewDropdown;
