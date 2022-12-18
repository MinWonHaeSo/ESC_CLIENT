import React from 'react';
import { contextFileType } from '@/context/OriginFilesContext';
import { imagesType } from '@/store/stadiumWriteSlice';
import { v4 as uuidv4 } from 'uuid';

const fileObjectToIdUrlFile = (files: FileList) => {
  const fileArray = Array.from(files);

  const fileInfoArray = fileArray.reduce((obj, cur) => {
    return [...obj, ...[{ id: uuidv4(), url: URL.createObjectURL(cur), file: cur }]];
  }, [] as contextFileType[]);

  const fileInfoExcludeFile = fileInfoArray.reduce((obj, cur) => {
    return [...obj, ...[{ publicId: cur.id, imgUrl: cur.url }]];
  }, [] as imagesType[]);

  return { fileInfoArray, fileInfoExcludeFile };
};

export default fileObjectToIdUrlFile;
