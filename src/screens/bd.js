import React, {Component} from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Overview, Emergency, DailyData} from '../screens';

const Tab = createMaterialTopTabNavigator();
export default class Bd extends Component {
  render() {
    return (
      <Tab.Navigator
        tabBarOptions={{
          style: {elevation: 0, shadowOpacity: 0},
          indicatorStyle: {height: 0},
        }}>
        <Tab.Screen name="Overview" component={Overview} />
        <Tab.Screen name="Emergency" component={Emergency} />
        <Tab.Screen name="Prevention" component={DailyData} />
      </Tab.Navigator>
    );
  }
}
