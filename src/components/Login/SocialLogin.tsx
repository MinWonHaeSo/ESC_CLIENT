import palette from '@/lib/styles/palette';
import styled from '@emotion/styled';

interface SocialLoginProps {}

const SocialLogin = (props: SocialLoginProps) => {
  return (
    <Block>
      <Title>SNS 계정으로 로그인하기</Title>
      <ButtonList>
        <Button type="button">
          <span>네이버 로그인</span>
        </Button>
        <Button type="button">
          <span>카카오 로그인</span>
        </Button>
        <Button type="button">
          <span>구글 로그인</span>
        </Button>
      </ButtonList>
    </Block>
  );
};

export default SocialLogin;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
`;

const Title = styled.h3`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${palette.grey[300]};
`;

const ButtonList = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  gap: 1rem;
`;

const Button = styled.button`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border: 1px solid ${palette.grey[300]};

  span {
    display: none;
  }
`;
