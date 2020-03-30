import React, {Component} from 'react';
import {View, Text, Dimensions, ActivityIndicator} from 'react-native';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default class loadingScreen extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: screenWidth,
          height: screenHeight,
          backgroundColor: '#141824',
        }}>
        <Text style={{color: '#fff'}}>Loading...</Text>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }
}
