import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

export default class Button extends Component {
  render() {
    const {onPressButton, title, style} = this.props;
    return (
      <TouchableOpacity onPress={onPressButton} style={(styles.btnDesc, style)}>
        <Text style={styles.btnText}>{title}</Text>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  btnDesc: {
    backgroundColor: '#FC7B7B',
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 14,
    textTransform: 'uppercase',
  },
});
