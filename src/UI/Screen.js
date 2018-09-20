import React from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.svg';

const Container = styled.div`
  flex: 1;
  flex-direction: column;
  background: white;

  align-items: center;
`;

const Logo = styled.img`
  width: 40px;
  height: 40px;
`;

export default ({ children }) => (
  <Container>
    <Logo src={logo} />
    {children}
  </Container>
);
