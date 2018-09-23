import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-grow: 10;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 20px;

  padding-left: 20px;
  padding-right: 20px;
  paddin-bottom: 20px;
  border: 1px solid black;
`;

const CompanyName = styled.p`
  font-style: normal;
  font-weight: normal;
  line-height: 26px;
  font-size: 16px;
  color: black;
`;

const Rating = styled.p`
  margin-top: 0;
  margin-bottom: 0;

  font-style: normal;
  font-weight: normal;
  line-height: 48px;
  font-size: 40px;
  color: black;
`;

const Company = ({ company, rating }) => {
  const { id, name } = company;
  return (
    <Link to={`/company/${id}`}>
      <Container>
        <CompanyName>{name}</CompanyName>
        <Rating>{rating}</Rating>
      </Container>
    </Link>
  );
};

export default Company;
