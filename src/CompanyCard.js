import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-grow: 10;

  flex-direction: column;

  margin-bottom: 20px;

  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  paddin-bottom: 20px;
  border: 1px solid black;
`;

const CompanyName = styled.p`
  font-style: normal;
  font-weight: normal;
  line-height: 26px;
  font-size: 10px;
  color: black;
`;

const Company = ({ company }) => {
  const { id, name } = company;
  return (
    <Link to={`/company/${id}`}>
      <Container>
        <CompanyName>{name}</CompanyName>
      </Container>
    </Link>
  );
};

export default Company;
