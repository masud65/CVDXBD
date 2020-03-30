import React, {Component} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {WorldPage, AllCountries} from '../screens';

const Tab = createMaterialTopTabNavigator();
export default class BWorldd extends Component {
  render() {
    return (
      <Tab.Navigator
        tabBarOptions={{
          style: {elevation: 0, shadowOpacity: 0},
          indicatorStyle: {height: 0},
        }}>
        <Tab.Screen name="World" component={WorldPage} />
        <Tab.Screen name="All Countries" component={AllCountries} />
      </Tab.Navigator>
    );
  }
}
