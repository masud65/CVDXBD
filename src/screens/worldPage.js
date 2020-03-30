import React from 'react';
import {ScrollView, Text, StyleSheet} from 'react-native';
import WorldCard from '../components/worldCard';
import Gradient from '../components/common/GradientBack';

class WorldPage extends React.PureComponent {
  render() {
    return (
      <Gradient>
        <ScrollView>
          <WorldCard />
        </ScrollView>
      </Gradient>
    );
  }
}

export default WorldPage;
const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});
