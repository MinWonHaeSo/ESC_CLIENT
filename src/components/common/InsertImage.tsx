import palette from '@/lib/styles/palette';
import styled from '@emotion/styled';

interface InsertImageProps {}

const InsertImage = (props: InsertImageProps) => {
  return (
    <ImgBlock>
      <Img src="/" alt="프로필" />
      <PlusButton>
        <i className="fa-solid fa-plus"></i>
      </PlusButton>
    </ImgBlock>
  );
};

export default InsertImage;

const ImgBlock = styled.div`
  position: relative;
  margin: 40px auto 0;
  width: 120px;
  height: 120px;
  background-color: ${palette.grey[200]};
  border-radius: 50%;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: contain;
`;

const PlusButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: transparent;

  i {
    font-size: 24px;
  }
`;
