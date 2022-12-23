import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import styled from '@emotion/styled';

interface ToggleButtonProps {
  open: boolean;
  onAccordionToggle: () => void;
}

const AccordionToggleButton = ({ open, onAccordionToggle }: ToggleButtonProps) => {
  return (
    <ToggleButton onClick={onAccordionToggle}>
      <i
        className="fa-solid fa-chevron-right"
        style={open ? { transform: 'rotate(-90deg)' } : { transform: 'rotate(90deg)' }}
      ></i>
    </ToggleButton>
  );
};

export default AccordionToggleButton;

const ToggleButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid ${palette.grey[400]};

  i {
    font-size: ${typo.small};
    color: ${palette.grey[500]};
    transition: all 0.3s;
  }
`;
