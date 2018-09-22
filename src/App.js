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
    companies: [],
    companiesIndex: {},
    review: {
      Text:
        'Отвратительно доставили заказ. Заказывали еду на дом, курьер через 1.5 часа приехал с термосумкой, вынул из неё протёкший снизу бумажный пакет. Внутри пакета все контейнеры были приоткрыты с уголков и все содержимое вытекло. Как мы поняли, первоначально плохо упаковали в ресторане! От заказа соответственно отказались, звонили в сам ресторан и предпринять какие-либо меры они отказались… вот так отвратительно...',
      author: 'Родамир Владимирович',
      companyid: 2014,
      id: 1546,
      rating: '4.0',
      relevance: '0.72',
      time: 1537615192821,
    },
    category: { id: 3001, name: 'restaraunt' },
    company: { category: 3003, id: 2014, name: 'Barbershop Moo' },
  };

  componentDidMount() {
    firebase.initializeApp(firebaseConfig);
    var db = firebase.firestore();

    db.settings({
      timestampsInSnapshots: true,
    });

    db.collection('companies')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const id = doc.data().id;
          this.setState(prevState => {
            const index = prevState.companies.length;
            const newCompanies = { companies: [...prevState.companies, doc.data()] };
            const newIndex = { companiesIndex: { ...prevState.companiesIndex, [id]: index } };
            return Object.assign({}, newCompanies, newIndex);
          });
          console.log(`${doc.id} => ${doc.data()}`);
        });
      });
  }

  setRating = (id, rating) => {
    this.setState(prevState => {
      const { companiesIndex, companies } = this.state;
      const index = companiesIndex[id];
      const value = Object.assign({}, companies[index], { rating: `${rating}.0` });
      let companiesCopy = prevState.companies.slice();
      companiesCopy.splice(index, 1, value);
      return { companies: companiesCopy };
    });
  };

  render() {
    const { companies, companiesIndex } = this.state;
    return (
      <Router>
        <Screen>
          <Route exact path="/" render={() => <CompaniesList companies={companies} />} />
          <Route
            exact
            path="/company/:id"
            render={({ match }) => (
              <Company companies={companies} companiesIndex={companiesIndex} match={match} />
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
                setRating={this.setRating}
              />
            )}
          />
        </Screen>
      </Router>
    );
  }
}

export default App;
