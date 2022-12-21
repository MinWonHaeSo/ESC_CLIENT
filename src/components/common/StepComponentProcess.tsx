import React from 'react';

interface StepComponentProcessProps {
  step?: number;
  component?: JSX.Element;
}

const StepComponentProcess = ({ step, component }: StepComponentProcessProps) => {
  return <>{component}</>;
};

export default StepComponentProcess;
