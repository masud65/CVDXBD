import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Pie from 'react-native-pie';
function PieCharts(props) {
  const x = props.cValue;
  const y = props.dValue;
  const z = props.rValue;
  return (
    <View style={styles.container}>
      <Pie
        radius={60}
        innerRadius={50}
        sections={[
          {
            percentage: x,
            color: 'yellow',
          },
          {
            percentage: y,
            color: 'green',
          },
          {
            percentage: z,
            color: 'red',
          },
        ]}
        strokeCap={'butt'}
      />
    </View>
  );
}

export default PieCharts;

const styles = StyleSheet.create({
  container: {alignItems: 'center', justifyContent: 'center'},
  gauge: {
    position: 'absolute',
    width: 100,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gaugeText: {
    backgroundColor: 'transparent',
    color: '#000',
    fontSize: 24,
  },
});
