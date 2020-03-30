import 'react-native-gesture-handler';
import React, {Component} from 'react';
import Navigator from './Navigator';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';
import {gql} from 'apollo-boost';

const client = new ApolloClient({
  uri: 'http://192.168.1.5:9000/endpoint',
  credentials: 'include',
});

const App: () => React$Node = () => {
  return (
    <ApolloProvider client={client}>
      <Navigator />
    </ApolloProvider>
  );
};

export default App;
