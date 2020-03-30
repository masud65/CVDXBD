import React, {Component} from 'react';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Icon,
  Right,
  View,
} from 'native-base';
import {useQuery} from '@apollo/react-hooks';
import {gql} from 'apollo-boost';

const WORLD_DATA = gql`
  {
    getAll {
      cases
      recovered
    }
  }
`;

function CardListExample() {
  const {loading, error, data} = useQuery(WORLD_DATA);
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :(</Text>;
  return (
    <View>
      <Text>Total cases: {data.getAll.cases}</Text>
      <Text>{data.getAll.recovered}</Text>
      <Text>Masud fdsfgfrg</Text>
    </View>
  );
}
export default CardListExample;
