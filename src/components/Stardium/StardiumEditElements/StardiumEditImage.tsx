import React, { useRef } from 'react';
import palette from '@/lib/styles/palette';
import styled from '@emotion/styled';
import { addImages, imagesType, removeImage } from '@/store/stardiumWriteSlice';
import { useDispatch } from 'react-redux';
import StardiumEditImageList from './StardiumEditImageList';
import { contextFileType } from '@/context/OriginFilesContext';
import fileObjectToIdUrlFile from '@/lib/utils/fileObjectToIdUrlFile';

interface StardiumEditImageProps {
  images: imagesType[];
  onAddImages: (files: contextFileType[]) => void;
  onRemoveImages: (id: string) => void;
}

const StardiumEditImage = ({ images, onAddImages, onRemoveImages }: StardiumEditImageProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();

  const handleChangeImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const { fileInfoArray, fileInfoExcludeFile } = fileObjectToIdUrlFile(e.target.files);

    onAddImages(fileInfoArray);
    dispatch(addImages(fileInfoExcludeFile));

    // Delete 후 file Value 변동 사항 없어 이전 등록한 사진 값과 동일한 사진 업로드 하면 onChange Event 발생 안됨.
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDeleteImages = (index: string) => {
    dispatch(removeImage(index));
    onRemoveImages(String(index));
  };

  const handleClickFileButton = () => {
    fileInputRef.current?.click();
  };

  return (
    <ImagesUploadContainer>
      <div>
        <button type="button" className="input-file-btn" onClick={handleClickFileButton}>
          이미지는 최대 5장 업로드 가능합니다. <br />( + )
        </button>
        <input
          type="file"
          onChange={handleChangeImages}
          multiple
          accept=".gif, .jpg, .png"
          style={{ display: 'none' }}
          ref={fileInputRef}
        />
      </div>
      <ImagesPreviewContainer>
        <span className="preview-count">{images.length} / 5</span>
        <ul>
          {images.map(image => (
            <StardiumEditImageList key={image.id} id={image.id} url={image.url} onDeleteImage={handleDeleteImages} />
          ))}
        </ul>
      </ImagesPreviewContainer>
    </ImagesUploadContainer>
  );
};

const ImagesUploadContainer = styled.div`
  width: 100%;

  .input-file-btn {
    width: 100%;
    height: 150px;
    border-radius: 10px;
    margin-bottom: 1rem;
    background-color: ${palette.grey[200]};
    box-shadow: 1px 1px 5px rgb(197 197 197);
    color: ${palette.grey[500]};
    font-weight: 600;

    /* &:hover {
      background-color: ${palette.grey[300]};
      opacity: 0.7;
    } */
  }
`;

const ImagesPreviewContainer = styled.div`
  ul {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    overflow: auto;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    img {
      object-fit: contain;
    }
  }
  ul::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }

  li {
    img {
      border-radius: 10px;
      border: 1px solid ${palette.grey[200]};
    }
    .delete-preview-btn {
      display: block;
      width: 50%;
      height: 25px;
      margin-left: auto;
      border-radius: 10px;
      background-color: ${palette.primary['point']};
      color: #fff;
      align-items: center;
    }
  }

  .preview-count {
    display: flex;
    width: 50px;
    margin-left: auto;
    border-radius: 10px;
    background-color: ${palette.primary['orange']};
    color: #fff;
    align-items: center;
    justify-content: center;
  }
`;

export default React.memo(StardiumEditImage);
