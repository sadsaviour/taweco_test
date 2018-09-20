import React from 'react';
import styled from 'styled-components';
import Ionicon from 'react-ionicons';

const Container = styled.div`
  padding-right: 20;
  padding-left: 20;
`;

const RatingContainer = styled.div`
  display: flex;
  padding-top: 12;
  padding-bottom: 24;
  flex-flow: row nowrap;
  justify-content: space-between;
`;

const Rating = ({ value, onRatingSelected }) => (
  <RatingContainer>
    {Array(5)
      .fill()
      .map((e, i) => (
        <Ionicon
          key={String(i)}
          icon={i < value ? 'ios-star' : 'ios-star-outline'}
          fontSize="34px"
          color="#000000"
          onClick={() => onRatingSelected(i + 1)}
        />
      ))}
  </RatingContainer>
);

export default ({ rating, setRating }) => (
  <Container>
    <Rating value={rating} onRatingSelected={setRating} />
  </Container>
);
