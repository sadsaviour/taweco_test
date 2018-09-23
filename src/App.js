import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import firebase from '@firebase/app';
import '@firebase/firestore';
import Screen from './UI/Screen';
import CompaniesList from './CompaniesList';
import Company from './Company';
import AddReview from './AddReview';
import firebaseConfig from './firebase';

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

class App extends Component {
  state = {
    isLoading: true,
    companies: [],
    companiesIndex: {},
    reviews: [],
    ratings: {},
    categories: {},
  };

  componentDidMount() {
    db.settings({
      timestampsInSnapshots: true,
    });

    db.collection('companies')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const id = doc.data().id;
          this.setState(prevState => {
            return { companies: [...prevState.companies, doc.data()] };
          });
        });
      });

    db.collection('review')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc =>
          this.setState(prevState => {
            return { reviews: [...prevState.reviews, doc.data()] };
          }),
        );
      })
      .then(() => {
        const reviewsIndex = this.state.reviews.reduce((acc, review) => {
          const { companyid } = review;
          return !!acc[companyid]
            ? { ...acc, [companyid]: [...acc[companyid], review] }
            : { ...acc, [companyid]: [review] };
        }, {});

        this.setState({ reviewsIndex });
      })
      .then(() => {
        const { companies, reviewsIndex } = this.state;
        companies.map(company => {
          const { id } = company;
          const reviews = reviewsIndex[id];
          const n = reviews.length;
          const everageRatig = reviews.reduce((acc, r) => {
            const { rating, relevance } = r;
            return acc - ((5 - parseFloat(rating)) * parseFloat(relevance)) / n;
          }, 5);
          this.setState(prevState => {
            return { ratings: { ...prevState.ratings, [id]: Math.round(everageRatig) } };
          });
        });
      })
      .then(() => {
        const { companies, ratings } = this.state;

        const sortedCompanies = companies.slice().sort((a, b) => ratings[b.id] - ratings[a.id]);

        const newIndex = sortedCompanies.reduce((acc, c) => {
          return { ...acc, [c.id]: acc.length };
        }, {});

        this.setState({
          companies: sortedCompanies,
          companiesIndex: newIndex,
        });
      })
      .then(() => {
        this.setState({ isLoading: false });
      });
  }

  addReview = (id, rating, text) => {
    const newReview = {
      Text: text,
      author: 'taweco employee',
      companyid: id,
      id: new Date().valueOf(),
      rating,
      relevance: '0.85',
      time: new Date().valueOf(),
    };
    db.collection('review')
      .add(newReview)
      .then(() => {
        this.setState(prevState => {
          return {
            reviews: [newReview, ...prevState.reviews],
            reviewsIndex: {
              ...prevState.reviewsIndex,
              [id]: [newReview, ...prevState.reviewsIndex[id]],
            },
          };
        });
      });
  };

  render() {
    const { companies, companiesIndex, ratings, reviewsIndex, isLoading } = this.state;
    return (
      <Router>
        <Screen>
          {isLoading ? (
            <p>loading ...</p>
          ) : (
            <React.Fragment>
              <Route
                exact
                path="/"
                render={() => <CompaniesList companies={companies} ratings={ratings} />}
              />
              <Route
                exact
                path="/company/:id"
                render={({ match }) => (
                  <Company
                    companies={companies}
                    companiesIndex={companiesIndex}
                    ratings={ratings}
                    match={match}
                    reviewsIndex={reviewsIndex}
                  />
                )}
              />
              <Route
                exact
                path="/company/:id/review"
                render={({ match }) => (
                  <AddReview
                    companies={companies}
                    companiesIndex={companiesIndex}
                    match={match}
                    addReview={this.addReview}
                    ratings={ratings}
                  />
                )}
              />
            </React.Fragment>
          )}
        </Screen>
      </Router>
    );
  }
}

export default App;
