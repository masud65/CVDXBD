import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import styled from 'styled-components';
import Gradient from '../components/common/GradientBack';

export default function NewsSingle({route}) {
  const {title} = route.params;
  const {details} = route.params;
  const id = route.params.id || null;
  return (
    <Gradient>
      <ContainerTag>
        <BigText>{title}</BigText>
        <SmallText>{details}</SmallText>
        <SmallText>{id}</SmallText>
      </ContainerTag>
    </Gradient>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
  },
});

const ContainerTag = styled.View`
  width: 95%;
  margin: 20px auto;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
`;

const DataRow = styled.View`
  height: 150px;
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 10px;
`;

const Data = styled.View`
  background-color: #3724d3;
  border-radius: 10px;
  flex-basis: 45%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 2.5%;
`;

const BigText = styled.Text`
  font-size: 25px;
  align-self: center;
  color: ${props => props.color || '#fff'};
  font-weight: bold;
`;

const SmallText = styled.Text`
  font-size: 15px;
  color: #fff;
  align-self: center;
`;
