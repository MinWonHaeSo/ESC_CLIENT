import React from 'react';

interface StardiumEditImageListProps {
  id: string;
  url: string;
  onDeleteImage: (id: string) => void;
}

const StardiumEditImageList = ({ id, url, onDeleteImage }: StardiumEditImageListProps) => {
  return (
    <li key={`${id}`}>
      <img src={url} width="200px" height="100px" style={{ objectFit: 'cover' }} alt="미리보기" />
      <button type="button" className="delete-preview-btn" onClick={() => onDeleteImage(id)}>
        삭제
      </button>
    </li>
  );
};

export default StardiumEditImageList;
