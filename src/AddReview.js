import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CompanyCard from './CompanyCard';
import Stars from './Stars';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  paddin-bottom: 100px;
`;

const AddReviewButton = styled.input``;

const ReviewText = styled.textarea`
  padding: 8px;
  margin-bottom: 20px;
  margin-top: 20px;
`;

const Review = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

class AddReview extends React.Component {
  static contextTypes = {
    router: () => true,
  };

  state = {
    rating: 0,
    id: 0,
    text: '',
  };

  setRating = (id, rating) => {
    this.setState({ id, rating });
  };

  handleChange = event => {
    this.setState({ text: event.target.value });
  };

  handleSubmit = event => {
    const { id, rating, text } = this.state;
    this.props.addReview(id, rating, text);
    this.context.router.history.goBack();
    event.preventDefault();
  };

  render() {
    const { match, companies, companiesIndex, ratings } = this.props;
    const { rating, text } = this.state;
    const {
      params: { id },
    } = match;
    const company = companies[companiesIndex[id]];
    const averageRating = ratings[id];
    return (
      <Container>
        <CompanyCard company={company} rating={averageRating} />
        <Stars id={id} setRating={this.setRating} rating={rating} />
        <Review onSubmit={this.handleSubmit}>
          <ReviewText
            type="text"
            name="review"
            placeholder="your review text"
            rows="5"
            value={text}
            onChange={this.handleChange}
          />
          <AddReviewButton type="submit" value="Submit" />
        </Review>
      </Container>
    );
  }
}

export default AddReview;
