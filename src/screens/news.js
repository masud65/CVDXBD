import React, {Component} from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {LocalNews, InterNews} from '../screens';

const Tab = createMaterialTopTabNavigator();
export default class News extends Component {
  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Local" component={LocalNews} />
        <Tab.Screen name="International" component={InterNews} />
      </Tab.Navigator>
    );
  }
}
