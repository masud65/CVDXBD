import React from 'react';
import {SafeAreaView, View, FlatList, StyleSheet, Text} from 'react-native';
import styled from 'styled-components';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import Gradient from '../components/common/GradientBack';

const GET_COUNTRIES = gql`
  {
    getAllCountries {
      country
      cases
      deaths
      recovered
    }
  }
`;
function Item({title, cases, deaths, recovered}) {
  return (
    <ContainerTag>
      <Title color={'#fff'}>{title}</Title>
      <DetailsTag>
        <AddressTag>
          <SmallText>Infected</SmallText>
          <BigText>{cases}</BigText>
          <Text style={{color: '#fff'}}>Deaths: {deaths}</Text>
          <Text style={{color: '#fff'}}>Recovered: {recovered}</Text>
        </AddressTag>
      </DetailsTag>
    </ContainerTag>
  );
}
function AllCountries() {
  const {loading, error, data} = useQuery(GET_COUNTRIES);
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :(</Text>;
  return (
    <Gradient>
      <SafeAreaView>
        <FlatList
          initialNumToRender={10}
          data={data.getAllCountries}
          renderItem={({item}) => (
            <Item
              title={item.country}
              cases={item.cases}
              deaths={item.deaths}
              recovered={item.recovered}
            />
          )}
        />
      </SafeAreaView>
    </Gradient>
  );
}
const ContainerTag = styled.View`
  width: 95%;
  min-height: 50px;
  background: #21273f;
  margin: 10px;
  padding: 10px;
`;
const DetailsTag = styled.View`
  padding: 10px;
  min-height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const AddressTag = styled.View`
  width: 70%;
  height: 100%;
`;
const Title = styled.Text`
  font-size: 18px;
  margin-bottom: 5px;
  color: ${props => props.color || '#fff'};
  font-weight: bold;
  line-height: 40px;
  border-bottom-width: 1px;
  border-bottom-color: #ddd;
`;

const BigText = styled.Text`
  font-size: 18px;
  margin-bottom: 5px;
  color: ${props => props.color || '#fff'};
  font-weight: bold;
  line-height: 40px;
`;

const SmallText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
`;
export default AllCountries;
