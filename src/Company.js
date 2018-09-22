import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CompanyCard from './CompanyCard';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  paddin-bottom: 100px;
`;

const AddReview = styled.button``;

const Company = ({ companies, companiesIndex, match }) => {
  const {
    params: { id },
  } = match;
  const company = companies[companiesIndex[id]];
  return (
    <Container>
      <CompanyCard company={company} />
      <Link to={`/company/${id}/review`}>
        <AddReview>Add Review</AddReview>
      </Link>
    </Container>
  );
};

export default Company;
