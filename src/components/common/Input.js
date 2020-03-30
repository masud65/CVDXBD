import React, {Component} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';

const Input = ({label, value, onChangeText, placeholder, secureTextEntry}) => {
  return (
    <TextInput
      style={[
        {
          height: 50,
          borderRadius: 5,
          padding: 10,
          borderBottomColor: '#A3B3F9',
          borderBottomWidth: 1,
        },
        customStyle,
      ]}
      secureTextEntry={secureTextEntry}
      placeholder={placeholder}
      autoCorrect={false}
      value={value}
      onChangeText={onChangeText}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
