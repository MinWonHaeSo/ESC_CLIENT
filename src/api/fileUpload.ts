import axios, { AxiosResponse } from 'axios';
import { contextFileType } from '@/context/OriginFilesContext';

const CLOUDINARY_KEY = import.meta.env.VITE_CLOUDINARY_KEY;
const CLOUDINARY_PRESET = import.meta.env.VITE_CLOUDINARY_PRESET;
const CLOUDINARY_NAME = import.meta.env.VITE_CLOUDINARY_NAME;

type CloudinaryResponse = {
  data: {
    public_id: string;
    url: string;
    secure_url: string;
  };
};

// 클라우디너리 파일 업로드 요청
export const fileUpload = <T extends Record<string, any>>(
  contextFile: T[] | undefined,
  name: string,
): Promise<AxiosResponse<any, CloudinaryResponse>[]> => {
  if (typeof contextFile === undefined) return axios.all([]);

  let uploaders: Promise<AxiosResponse<any, any>>[] = [];

  switch (name) {
    case 'stadium':
      uploaders = contextFile!.map(content => {
        const { formData, config } = fileForm(content.file);
        return axios.post(`https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`, formData, config);
      });
      break;
    case 'rental':
      uploaders = contextFile!.map(content => {
        const { formData, config } = publicIdFileForm(content.state.file, content.id);
        return axios.post(`https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`, formData, config);
      });
      break;

    default:
      break;
  }

  return axios.all([...uploaders]);
};

const fileForm = (file: File) => {
  // Initial FormData
  const formData = new FormData();
  formData.append('file', file);
  // formData.append('tags', `codeinfuse, medium, gist`);
  formData.append('upload_preset', CLOUDINARY_PRESET); // Replace the preset name with your own
  formData.append('api_key', CLOUDINARY_KEY); // Replace API key with your own Cloudinary key
  formData.append('timestamp', String((Date.now() / 1000) | 0));

  const config = {
    headers: { 'Content-Type': 'multipart/form-data' },
  };

  return { formData, config };
};

const publicIdFileForm = (file: File, id: string) => {
  // Initial FormData
  const formData = new FormData();
  formData.append('file', file);
  // formData.append('tags', `codeinfuse, medium, gist`);
  formData.append('public_id', id);
  formData.append('upload_preset', CLOUDINARY_PRESET); // Replace the preset name with your own
  formData.append('api_key', CLOUDINARY_KEY); // Replace API key with your own Cloudinary key
  formData.append('timestamp', String((Date.now() / 1000) | 0));

  const config = {
    headers: { 'Content-Type': 'multipart/form-data' },
  };

  return { formData, config };
};
