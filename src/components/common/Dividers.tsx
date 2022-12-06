import palette from '@/lib/styles/palette'
import styled from '@emotion/styled'
import React from 'react'


const Dividers = () => {
  return <Line />;
}



const Line = styled.div`
  width: 100%;
  border-top: 1px solid ${palette.grey[400]};
`

export default Dividers