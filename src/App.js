import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import firebase from '@firebase/app';
import '@firebase/firestore';
import Screen from './UI/Screen';
import CompaniesList from './CompaniesList';
import Company from './Company';
import AddReview from './AddReview';
import firebaseConfig from './firebase';

class App extends Component {
  state = {
    companies: [
      { id: 1, name: 'one', reviews: { rating: 0, text: 'test review' } },
      { id: 2, name: 'two', reviews: { rating: 0, text: 'test review' } },
    ],
  };

  componentWillMount() {
    firebase.initializeApp(firebaseConfig);
    var db = firebase.firestore();

    db.settings({
      timestampsInSnapshots: true,
    });
    /*
    db.collection('Company')
      .add({
        id: new Date().valueOf(),
        name: 'test',
        categoryId: [1],
      })
      .then(function(docRef) {
        console.log('Document written with ID: ', docRef.id);
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });
     */

    db.collection('Category')
      .get()
      .then(querySnapshot => {
        console.log(querySnapshot.size);
      });
  }

  setRating(id, rating) {
    this.setState(prevState => {
      var stateCopy = Object.assign({}, prevState);
      stateCopy.companies[id - 1].rating = rating;
      return { companies: stateCopy };
    });
  }

  render() {
    const { companies, setRating } = this.state;
    return (
      <Router>
        <Screen>
          <Route exact path="/" render={() => <CompaniesList companies={companies} />} />
          <Route
            exact
            path="/company/:id"
            render={({ match }) => <Company companies={companies} match={match} />}
          />
          <Route
            path="/company/:id/review"
            render={({ match }) => (
              <AddReview companies={companies} match={match} setRating={setRating} />
            )}
          />
        </Screen>
      </Router>
    );
  }
}

export default App;
