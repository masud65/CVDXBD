import React, {Component} from 'react';
import {Text, Icon, View, StyleSheet} from 'react-native';
import {useQuery} from '@apollo/react-hooks';
import {gql} from 'apollo-boost';
import styled from 'styled-components';

const WORLD_DATA = gql`
  {
    getAll {
      cases
      recovered
      deaths
      totalAffected
      activeCases
      updated
      updatedAt
      fatalityRate
      recoveryRate
    }
  }
`;

export default function WorldCard() {
  const {loading, error, data} = useQuery(WORLD_DATA);
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :(</Text>;
  return (
    <>
      <ContainerTag>
        <DataRow>
          <Data>
            <BigText color={'darkred'}>{data.getAll.cases}</BigText>
            <SmallText>Total</SmallText>
          </Data>
          <Data>
            <BigText color={'green'}>{data.getAll.recovered}</BigText>
            <SmallText>Recovered</SmallText>
          </Data>
        </DataRow>
        <DataRow>
          <Data>
            <BigText color={'red'}>{data.getAll.deaths}</BigText>
            <SmallText>Deaths</SmallText>
          </Data>
          <Data>
            <BigText color={'darkred'}>{data.getAll.activeCases}</BigText>
            <SmallText>Active</SmallText>
          </Data>
        </DataRow>
        <DataRow>
          <Data>
            <BigText color={'orange'}>
              {data.getAll.fatalityRate.toFixed(2)}
            </BigText>
            <SmallText>Fatality Rate</SmallText>
          </Data>
          <Data>
            <BigText color={'green'}>
              {data.getAll.recoveryRate.toFixed(2)}
            </BigText>
            <SmallText>Recovery Rate</SmallText>
          </Data>
        </DataRow>
        <Text style={{color: '#fff', alignSelf: 'flex-end', marginRight: '5%'}}>
          Source: Worldometer
        </Text>
      </ContainerTag>
    </>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
  },
});

const ContainerTag = styled.View`
  width: 95%;
  min-height: 20px;
  margin: 20px auto;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start
  flex-direction: column;
  box-shadow: 0 4px 6px #ddd;
`;

const DataRow = styled.View`
  flex-basis: 100%;
  height: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding: 10px;
`;

const Data = styled.View`
  background-color: #f7f7f7;
  border: 1px solid #ddd;
  flex-basis: 45%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 2.5%;
`;

const BigText = styled.Text`
  font-size: 20px;
  margin-bottom: 5px;
  color: ${props => props.color || '#000'};
  font-weight: bold;
`;

const SmallText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #040716;
`;
