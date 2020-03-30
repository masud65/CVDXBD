import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientBack = ({children}) => (
  <LinearGradient
    start={{x: 0, y: 0}}
    end={{x: 1, y: 0}}
    colors={['#141d26', '#252668']}
    useAngle={true}
    angle={-45}
    angleCenter={{x: 0.3, y: 0.7}}
    style={styles.linearGradient}>
    {children}
  </LinearGradient>
);
export default GradientBack;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
});
