import styled from '@emotion/styled';
import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';

interface RequiredMessageProps {
  children?: React.ReactNode;
  required: boolean;
}

const RequiredMessage = ({ children = '필수 입력 항목입니다.', required }: RequiredMessageProps) => {
  return <Message required={required}> {children} </Message>;
};

export default RequiredMessage;

const Message = styled.div<{ required: boolean }>`
  display: ${({ required }) => (required ? 'block' : 'none')};
  font-size: ${typo.small};
  color: ${palette.primary.red};
`;
