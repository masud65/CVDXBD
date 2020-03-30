import React from 'react';
import {Mutation, Query} from '@apollo/react-components';
import {GET_CURRENT_USER} from './src/screens/profile';

const User = props => {
  return (
    <Query {...props} query={GET_CURRENT_USER}>
      {payload => props.children(payload)}
    </Query>
  );
};

export default User;
