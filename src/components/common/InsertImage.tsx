import { useRef, useState } from 'react';
import palette from '@/lib/styles/palette';
import styled from '@emotion/styled';
import { useAppDispatch } from '@/store/store';
import { uploadImage } from '@/store/authSlice';
import { setImage } from '@/store/userSlice';
import { useEffect } from 'react';
import { DEFAULT_PROFILE_IMGURL } from '@/constants/defaultImage';

interface InsertImageProps {
  editDisabled: boolean;
  currentImage: string;
  currentLocation: string;
  onChangeImage: (file: File) => void;
}

interface ImageFile {
  imageURL: string;
}

const InsertImage = ({ editDisabled, currentImage, currentLocation, onChangeImage }: InsertImageProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageFile, setImageFile] = useState<ImageFile>({ imageURL: '' });

  const dispatch = useAppDispatch();

  const handleClickFileButton = () => {
    if (!fileInputRef.current) return;
    if (!editDisabled) {
      fileInputRef.current.click();
    }
  };

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedImg = e.target.files[0];
    const imageURL = URL.createObjectURL(selectedImg);
    setImageFile({ ...imageFile, imageURL: imageURL });
    onChangeImage(selectedImg);

    if (currentLocation === '/mypage') {
      dispatch(uploadImage(imageURL));
    } else if (currentLocation === '/signup') {
      dispatch(uploadImage(imageURL));
      dispatch(setImage(imageURL));
    }
  };

  useEffect(() => {
    if (!fileInputRef) {
      return;
    }
    setImageFile({ ...imageFile, imageURL: currentImage });
  }, [currentImage]);

  return (
    <ImgBlock>
      <Img src={currentImage ? imageFile.imageURL : DEFAULT_PROFILE_IMGURL} alt="프로필" disabled={editDisabled} />
      <PlusButton onClick={handleClickFileButton} type={'button'}>
        {editDisabled ? null : <i className="fa-solid fa-plus" />}
      </PlusButton>
      <FileInput type="file" ref={fileInputRef} onChange={handleUploadImage} accept="image/*" />
    </ImgBlock>
  );
};

export default InsertImage;

const ImgBlock = styled.div`
  position: relative;
  margin: 40px auto 0;
  width: 150px;
  height: 150px;
  background-color: ${palette.grey[200]};
  border-radius: 50%;
`;

const Img = styled.img<{ disabled: boolean }>`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  z-index: 100;

  ${({ disabled }) => !disabled && `border: 1px solid ${palette.grey[300]}`}
`;

const PlusButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  background: transparent;

  i {
    font-size: 24px;
  }
`;

const FileInput = styled.input`
  display: none;
  position: absolute;
  bottom: -2rem;
  left: -0.5rem;
`;
