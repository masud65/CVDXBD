import React, {Component} from 'react';
import {Text, Icon, View, StyleSheet} from 'react-native';
import PieChart from './piechart';
import {useQuery} from '@apollo/react-hooks';
import {gql} from 'apollo-boost';
import styled from 'styled-components';
import Loading from '../components/loadingScreen';

const BANGLADESH_DATA = gql`
  {
    getBdData {
      countryData {
        cases
        todayCases
        deaths
        todayDeaths
        recovered
        active
        critical
        casesPerOneMillion
      }
    }
  }
`;

export default function PieCard() {
  const {loading, error, data} = useQuery(BANGLADESH_DATA);
  if (loading) return <Loading />;
  if (error) return <Text>Somethig Went Wrong.. </Text>;
  return (
    <>
      <ContainerTag>
        <DataRow height={'100px'}>
          <Data color={'#5666cc'} flexb={'95%'}>
            <SmallText>Today </SmallText>
            <SmallText>
              Cases: {data.getBdData.countryData.todayCases} {'   '}
              Death: {data.getBdData.countryData.todayDeaths}
            </SmallText>
          </Data>
        </DataRow>
        <DataRow>
          <Data color={'#fc4422'}>
            <BigText color={'#fff'}>{data.getBdData.countryData.cases}</BigText>
            <SmallText>Total</SmallText>
          </Data>
          <Data color={'#ffaf5f'}>
            <BigText color={'#fff'}>
              {data.getBdData.countryData.recovered}
            </BigText>
            <SmallText>Recovered</SmallText>
          </Data>
        </DataRow>
        <DataRow>
          <Data color={'#f54336'}>
            <BigText color={'#fff'}>
              {data.getBdData.countryData.deaths}
            </BigText>
            <SmallText>Deaths</SmallText>
          </Data>
          <Data color={'#778dd8'}>
            <BigText color={'#fff'}>
              {data.getBdData.countryData.active}
            </BigText>
            <SmallText>Active</SmallText>
          </Data>
        </DataRow>
        <DataRow>
          <Data color={'#f4d81c'}>
            <BigText color={'#fff'}>
              {data.getBdData.countryData.critical}
            </BigText>
            <SmallText>Critical</SmallText>
          </Data>

          <Data color={'#3f3e3e'}>
            <BigText color={'#fff'}>
              {data.getBdData.countryData.casesPerOneMillion}
            </BigText>
            <Text style={{color: '#fff'}}>Cases Per Million</Text>
          </Data>
        </DataRow>
        <DataRow height={'50px'}>
          <Data color={'transparent'}>
            <Text style={{color: '#FFF'}}>Last updated:</Text>
          </Data>
          <Data color={'transparent'}>
            <Text style={{color: '#FFF'}}>Source: Worldometer</Text>
          </Data>
        </DataRow>
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
  height: ${props => props.height || '150px'};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding: 10px;
`;

const Data = styled.View`
  background-color: ${props => props.color || '#fff'};
  border-radius: 0px;
  flex-basis: ${props => props.flexb || '45%'};
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 2.5%;
`;
const DataFull = styled.View`
  background-color: ${props => props.color || '#fff'};
  border-radius: 0px;
  flex-basis: 95%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 2.5%;
`;

const BigText = styled.Text`
  font-size: 40px;
  margin-bottom: 5px;
  color: ${props => props.color || '#000'};
  font-weight: bold;
`;

const SmallText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${props => props.color || '#fff'};
`;
