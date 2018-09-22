import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Ionicon from 'react-ionicons';
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

const ReviewField = styled.button``;

const RatingContainer = styled.div`
  display: flex;
  padding-top: 12;
  padding-bottom: 24;
  flex-flow: row nowrap;
  justify-content: space-between;
`;

const AddReview = ({
  companies, match, setRating, companiesIndex,
}) => {
  const {
    params: { id },
  } = match;
  const company = companies[companiesIndex[id]];
  const { rating } = company;
  return (
    <Container>
      <CompanyCard company={company} />
      <RatingContainer>
        {Array(5)
          .fill()
          .map((e, i) => (
            <Ionicon
              key={String(i)}
              icon={i < rating ? 'ios-star' : 'ios-star-outline'}
              fontSize="34px"
              color="#000000"
              onClick={() => setRating(id, i + 1)}
            />
          ))}
      </RatingContainer>
    </Container>
  );
};

export default AddReview;
