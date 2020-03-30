import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Text} from 'react-native-svg';
import PieCard from '../components/pieCard';
import BarCard from '../components/barCard';
import Gradient from '../components/common/GradientBack';

const styles = StyleSheet.create({});

class Overview extends React.PureComponent {
  render() {
    return (
      <Gradient>
        <ScrollView>
          <PieCard />
        </ScrollView>
      </Gradient>
    );
  }
}

export default Overview;
