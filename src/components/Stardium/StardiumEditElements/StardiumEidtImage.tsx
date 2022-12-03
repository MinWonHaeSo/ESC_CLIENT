import React, { useRef, useState } from 'react';
import palette from '@/lib/styles/palette';
import styled from '@emotion/styled';
import axios from 'axios';

// const uploaders = files.map(file => {
//   // Initial FormData
//   const formData = new FormData();
//   formData.append('file', file);
//   formData.append('tags', `codeinfuse, medium, gist`);
//   formData.append('upload_preset', 'pvhilzh7'); // Replace the preset name with your own
//   formData.append('api_key', '1234567'); // Replace API key with your own Cloudinary key
//   formData.append('timestamp', (Date.now() / 1000) | 0);

//   // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
//   return axios
//     .post('https://api.cloudinary.com/v1_1/codeinfuse/image/upload', formData, {
//       headers: { 'X-Requested-With': 'XMLHttpRequest' },
//     })
//     .then(response => {
//       const data = response.data;
//       const fileURL = data.secure_url; // You should store this URL for future references in your app
//       console.log(data);
//     });
// });

// // Once all the files are uploaded
// axios.all(uploaders).then(() => {
//   // ... perform after upload is successful operation
// });

type StardiumEidtImageProps = {};

const StardiumEidtImage = (props: StardiumEidtImageProps) => {
  const [images, setImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const fetchUploadImages = async (files: File[]) => {
    let formData = new FormData();

    formData.append('api_key', '711469973372778');
    formData.append('upload_preset', 'aji4mz7p');
    formData.append('timestamp', String((Date.now() / 1000) | 0));
    formData.append('file', files[0]);

    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
    };

    await axios.post('https://api.cloudinary.com/v1_1/dsbjcdw4r/image/upload', formData, config).then(res => {
      console.log(res.data);
      console.log(res.data.url);
    });
  };

  const handleChangeImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const files = Array.from(e.target.files);
      setImages(files);
      fetchUploadImages(files);
    }

    // Delete 후 file Value 변동 사항 없어 이전 등록한 사진 값과 동일한 사진 업로드 하면 onChange Event 발생 안됨.
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDeleteImages = (index: number) => {
    setImages([...images.slice(0, index), ...images.slice(index + 1)]);
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
          accept="application/pdf, image/png"
          style={{ display: 'none' }}
          ref={fileInputRef}
        />
      </div>
      <ImagesPreviewContainer>
        <span className="preview-count">{images.length} / 5</span>
        <ul>
          {images.map((image, idx) => (
            <li key={`${image.name}_${idx}`}>
              <img src={URL.createObjectURL(image)} width="200px" height="100px" alt="미리보기" />
              <button className="delete-preview-btn" onClick={() => handleDeleteImages(idx)}>
                삭제
              </button>
            </li>
          ))}
        </ul>
      </ImagesPreviewContainer>
    </ImagesUploadContainer>
  );
};

const ImagesUploadContainer = styled.div`
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

export default StardiumEidtImage;
