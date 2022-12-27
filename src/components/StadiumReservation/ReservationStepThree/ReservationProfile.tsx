import styled from '@emotion/styled';
import palette from '@/lib/styles/palette';
import StyledSeparateLine from './StyledSerparateLine';

interface ReservationProfileProps {
  nickname: string;
  email: string;
}

const ReservationProfile = ({ nickname, email }: ReservationProfileProps) => {
  return (
    <ReservationProfileBlock>
      <h2>예약자</h2>
      <StyledSeparateLine />
      <ProfileBody>
        <dt>{nickname}</dt>
        <dd>{email}</dd>
      </ProfileBody>
    </ReservationProfileBlock>
  );
};

export default ReservationProfile;

const ReservationProfileBlock = styled.div`
  margin-bottom: 12px;
  padding: 12px;
  border: 1px solid ${palette.grey[200]};
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

const ProfileBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 4px;
  padding: 2px;

  dt {
    font-weight: 500;
  }
`;
