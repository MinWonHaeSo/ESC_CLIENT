import palette from '@/lib/styles/palette';
import styled from '@emotion/styled';
import StyledSeparateLine from './StyledSerparateLine';

interface ReservationPaymentProps {}

const ReservationPayment = ({}: ReservationPaymentProps) => {
  return (
    <ReservationPaymentBlock>
      <h2>결제 방법</h2>
      <StyledSeparateLine />
      <PaymentMethod>
        <li>
          <input type="radio" id="local" name="payment" />
          <label htmlFor="local">현장 결제</label>
        </li>
        <li>
          <input type="radio" id="card" name="payment" />
          <label htmlFor="card">카드 결제</label>
        </li>
        <li>
          <input type="radio" id="account" name="payment" />
          <label htmlFor="account">계좌 결제</label>
        </li>
      </PaymentMethod>
    </ReservationPaymentBlock>
  );
};

export default ReservationPayment;

const ReservationPaymentBlock = styled.div`
  margin-bottom: 12px;
  padding: 12px;
  border: 1px solid ${palette.grey[200]};
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

const PaymentMethod = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;

  li {
    display: flex;
    align-items: center;
    margin-left: 2px;
  }

  input[type='radio'] {
    vertical-align: middle;
    appearance: none;
    margin-right: 0.6rem;
    width: 21px;
    height: 21px;
    border: max(2px, 0.1em) solid ${palette.grey[200]};
    border-radius: 50%;
  }

  input[type='radio']:checked {
    border: 0.4em solid ${palette.primary['green']};
  }
`;
