import React, { useState } from 'react'

export type contextFileType = {
  id: string;
  url: string;
  file: File;
}

type originStateType = {
  stadiums: contextFileType[];
  rental: { id: string; state: contextFileType }[];
};

export type originContextValueType = {
  state: originStateType;
  actions: {
    addStadiumImages: (files: contextFileType[]) => void;
    removeStadiumImages: (id: string) => void;
    addRentalImages: (files: contextFileType, id: string) => void;
    removeRentalImages: (id: string) => void;
  };
};

const OriginFilesContext = React.createContext<originContextValueType | null>(null);

type PropsType = {
  children: React.ReactNode
}

// 클라우디너리 파일 업로드 원본 이미지 객채 저장소
export const OriginFilesProvider = (props: PropsType) => {
  const [originFile, setOriginFile] = useState<originStateType>({
      stadiums: [],
    rental: [],
  });

  const addStadiumImages = (files: contextFileType[]) => {
    setOriginFile(prev => ({ ...prev, stadiums: files }));
  };
  
  const removeStadiumImages = (id: string) => {
    const filterOriginFile = originFile.stadiums.filter((file) => file.id !== id);
    setOriginFile(prev => ({ ...prev, stadiums: filterOriginFile }));
  }

  const addRentalImages = (files: contextFileType, id: string) => {
    setOriginFile(prev => ({ ...prev, rental: [...prev.rental, { id, state: files }] }));
  };

  const removeRentalImages = (id: string) => {
    const filterOriginFile = originFile.rental.filter((content) => content.id !== id);
    setOriginFile(prev => ({ ...prev, rental: filterOriginFile }));
  }

  const values: originContextValueType = {
    state: originFile,
    actions: { addStadiumImages, removeStadiumImages, addRentalImages, removeRentalImages },
  };

  return (
    <OriginFilesContext.Provider value={values}>
      {props.children}
    </OriginFilesContext.Provider>
  )
}

export default OriginFilesContext;