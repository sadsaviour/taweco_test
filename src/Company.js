import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CompanyCard from './CompanyCard';
import Stars from './Stars';

const Container = styled.div`
  display: flex;
  flex-grow: 10;
  flex-direction: column;
  align-items: stretch;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  paddin-bottom: 100px;
`;

const AddReview = styled.button`
  margin-bottom: 20px;
`;

const Review = styled.div`
  display: flex;
  flex-flow: column;

  padding: 8px;
  margin-bottom: 16px;

  border: 1px solid grey;
`;

const RatingRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`;

const EverageRating = styled.p`
  margin-top: 0;
  font-style: normal;
  font-weight: bold;
  line-height: 16px;
  font-size: 10px;
  color: black;
`;

const ReviewText = styled.p`
  margin-top: 0;
  font-style: normal;
  font-weight: normal;
  line-height: 16px;
  font-size: 10px;
  color: black;
`;

const ReviewsList = ({ reviews }) => (
  <React.Fragment>
    {reviews.map((r) => {
      const { Text, rating } = r;
      return (
        <Review>
          <RatingRow>
            <Stars rating={rating} />
            <EverageRating>{rating}</EverageRating>
          </RatingRow>
          <ReviewText>{Text}</ReviewText>
        </Review>
      );
    })}
  </React.Fragment>
);

const Company = ({
  companies, companiesIndex, match, ratings, reviewsIndex,
}) => {
  const {
    params: { id },
  } = match;
  const company = companies[companiesIndex[id]];
  const rating = ratings[id];
  const reviews = reviewsIndex[id];
  return (
    <Container>
      <CompanyCard company={company} rating={rating} />
      <Link to={`/company/${id}/review`}>
        <AddReview>Add Review</AddReview>
      </Link>
      <ReviewsList reviews={reviews} />
    </Container>
  );
};

export default Company;
