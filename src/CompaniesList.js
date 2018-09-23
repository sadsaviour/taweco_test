import React from 'react';
import styled from 'styled-components';

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

const Placeholder = styled.p`
  font-style: normal;
  font-weight: normal;
  line-height: 26px;
  font-size: 10px;
  color: grey;

  text-align: center;
`;

const Loading = () => <p>loading ...</p>;

const Companies = ({ companies, ratings }) => (
  <React.Fragment>
    {companies.map((company) => {
      const rating = ratings[company.id];
      return <CompanyCard company={company} rating={rating} key={String(company.id)} />;
    })}
  </React.Fragment>
);
const CompaniesList = ({ companies, ratings }) => {
  const list = companies
    ? companies.map(company => <CompanyCard company={company} key={String(company.id)} />)
    : null;
  return (
    <Container>
      {!list && <Placeholder>No companies</Placeholder>}
      <Companies companies={companies} ratings={ratings} />
    </Container>
  );
};

export default CompaniesList;
