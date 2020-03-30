import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useQuery} from '@apollo/react-hooks';
import {gql} from 'apollo-boost';
import styled from 'styled-components';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Gradient from '../components/common/GradientBack';

export const GET_CURRENT_USER = gql`
  {
    me {
      id
      email
      mobileNumber
      city
      country
      userGroup
      profile {
        firstName
        lastName
        gender
      }
    }
  }
`;

export default function Profile(props) {
  const {loading, error, data} = useQuery(GET_CURRENT_USER);
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :(</Text>;
  return (
    <Gradient>
      <ContainerTag>
        <View
          style={{
            width: '100%',
            borderRadius: 0,
            minHeight: 250,
            backgroundColor: '#31336f',
          }}>
          <Image
            style={{height: 150, width: 150, alignSelf: 'center'}}
            source={require('../images/profile.png')}
          />
          <BigText>
            {data.me.profile.firstName} {data.me.profile.lastName}
          </BigText>
          <SmallText>
            <SimpleLineIcons name={'location-pin'} size={15} color={'#fff'} />
            {data.me.city} , {data.me.country}
          </SmallText>
        </View>
        <View
          style={{
            alignItems: 'flex-start',
            width: '100%',
            borderWidth: 1,
            borderColor: '#24265e',
            backgroundColor: '#31336f',
          }}>
          <View
            style={{
              alignItems: 'flex-start',
              width: '100%',
              borderBottomWidth: 1,
              borderColor: '#24265e',
              minHeight: 60,
            }}>
            <SmallText>Gender: {data.me.profile.gender}</SmallText>
          </View>
          <View
            style={{
              alignItems: 'flex-start',
              width: '100%',
              borderBottomWidth: 1,
              borderColor: '#24265e',
              minHeight: 60,
            }}>
            <SmallText>Mobile: {data.me.mobileNumber}</SmallText>
          </View>
          <View
            style={{
              alignItems: 'flex-start',
              width: '100%',
              borderBottomWidth: 1,
              borderColor: '#24265e',
              minHeight: 60,
            }}>
            <SmallText>Email: {data.me.email}</SmallText>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Update Profile')}
          style={{
            marginTop: 10,
            justifyContent: 'center',
          }}>
          <View
            style={{
              height: 40,
              width: 200,
              backgroundColor: '#956956',
              alignItems: 'center',
              borderRadius: 20,
            }}>
            <Text
              style={{
                color: '#fff',
                marginTop: 10,
              }}>
              UPDATE PROFILE
            </Text>
          </View>
        </TouchableOpacity>
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
