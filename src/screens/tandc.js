import React, {Component} from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import Gradient from '../components/common/GradientBack';

export default class TandC extends Component {
  render() {
    return (
      <Gradient>
        <View>
          <Text style={{color: '#fff'}}>Terms and Condition</Text>
        </View>
      </Gradient>
    );
  }
}
