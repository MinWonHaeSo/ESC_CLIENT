import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import styled from '@emotion/styled';

interface RequiredMessageProps {
  required: boolean;
}

const RequiredMessage = ({ required }: RequiredMessageProps) => {
  return <Message required={required}> 필수 입력 항목입니다. </Message>;
};

export default RequiredMessage;

const Message = styled.div<{ required: boolean }>`
  display: ${({ required }) => (required ? 'block' : 'none')};
  font-size: ${typo.small};
  color: ${palette.primary.red};
`;
