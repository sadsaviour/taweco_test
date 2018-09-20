import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CompanyCard from './CompanyCard';
import RatingSelector from './RatingSelector';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  paddin-bottom: 100px;
`;

const ReviewField = styled.button``;

const AddReview = ({ companies, match, setRating }) => {
  const {
    params: { id },
  } = match;
  const company = companies[id - 1];
  const { rating } = company;
  return (
    <Container>
      <CompanyCard company={company} />
      <RatingSelector rating={rating} setRating={setRating} />
    </Container>
  );
};

export default AddReview;
