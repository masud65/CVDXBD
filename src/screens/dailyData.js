import React from 'react';
import {
  Text,
  Icon,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Gradient from '../components/common/GradientBack';

export default function DailyData(props) {
  return (
    <Gradient>
      <ScrollView>
        <BigText color={'#fff'}>How to be safe</BigText>
        <ContainerTag>
          <View>
            <BigText color={'#fff'}>Do's</BigText>
          </View>
          <DetailsTag>
            <AddressTag>
              <Text style={{color: '#fff'}}>Do these</Text>
            </AddressTag>
            <View style={{alignSelf: 'flex-end'}}>
              {/* <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('News Details', {
                  title: 'This is title',
                  details: 'Details of the news',
                })
              }>
              <Text
                style={{
                  color: '#fff',
                }}>
                see more
              </Text>
            </TouchableOpacity> */}
            </View>
          </DetailsTag>
        </ContainerTag>
        <ContainerTag>
          <View>
            <BigText color={'#fff'}>Don't</BigText>
          </View>
          <DetailsTag>
            <AddressTag>
              <Text style={{color: '#fff'}}>Don't do these</Text>
            </AddressTag>
            <View style={{alignSelf: 'flex-end'}}>
              {/* <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('News Details', {
                  title: 'This is title',
                  details: 'Details of the news',
                })
              }>
              <Text
                style={{
                  color: '#fff',
                }}>
                see more
              </Text>
            </TouchableOpacity> */}
            </View>
          </DetailsTag>
        </ContainerTag>
      </ScrollView>
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
  width: 100%;
  height: 100%;
`;

const BigText = styled.Text`
  font-size: 18px;
  margin-bottom: 5px;
  color: ${props => props.color || '#373737'};
  font-weight: bold;
  line-height: 40px;
  border-bottom-width: 1px;
  border-bottom-color: #ddd;
`;

const SmallText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
`;
