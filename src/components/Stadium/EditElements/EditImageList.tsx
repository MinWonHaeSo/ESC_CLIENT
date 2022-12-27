import React from 'react';

interface EditImageListProps {
  id: string;
  url: string;
  onDeleteImage: (id: string) => void;
}

const EditImageList = ({ id, url, onDeleteImage }: EditImageListProps) => {
  return (
    <li key={`${id}`}>
      <img src={url} width="200px" height="100px" style={{ objectFit: 'cover' }} alt="미리보기" />
      <button type="button" className="delete-preview-btn" onClick={() => onDeleteImage(id)}>
        삭제
      </button>
    </li>
  );
};

export default EditImageList;
