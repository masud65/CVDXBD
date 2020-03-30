import React, {Component, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Picker,
} from 'react-native';
import {Formik, useFormik} from 'formik';
import {Mutation} from '@apollo/react-components';
import {useQuery} from '@apollo/react-hooks';
import {gql} from 'apollo-boost';
import {GET_CURRENT_USER} from '../../src/screens/profile';
import Gradient from '../components/common/GradientBack';

const UPDATE_USER = gql`
  mutation updateProfile(
    $firstName: String
    $lastName: String
    $gender: String
  ) {
    updateProfile(firstName: $firstName, lastName: $lastName, gender: $gender) {
      id
    }
  }
`;

export default function UpdateProfile(props) {
  const {loading, error, data} = useQuery(GET_CURRENT_USER);
  let me = data ? data.me : null;
  return (
    <Gradient>
      <Mutation
        mutation={UPDATE_USER}
        refetchQueries={[
          {
            query: GET_CURRENT_USER,
          },
        ]}>
        {(updateProfile, {error, loading}) => (
          <SafeAreaView>
            <ScrollView>
              <Formik
                initialValues={{
                  firstName: me.profile.firstName,
                  lastName: me.profile.lastName,
                  gender: me.profile.gender,
                }}
                onSubmit={async (data, actions) => {
                  // e.preventDefault();

                  const response = await updateProfile({
                    variables: {
                      ...data,
                    },
                  });
                  props.navigation.navigate('ProfilePage');
                  actions.resetForm();
                  console.log(response);
                }}>
                {({handleChange, handleBlur, handleSubmit, values}) => (
                  <View style={styles.container}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 30,
                        maginBottom: 0,
                      }}>
                      <Text style={{color: '#fff', fontSize: 20}}>
                        Update Profile
                      </Text>
                    </View>
                    <View>
                      <View
                        style={{
                          marginTop: 20,
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <TextInput
                          placeholder="First Name"
                          placeholderTextColor="#ddd0ff"
                          nativeID="firstName"
                          value={values.firstName}
                          onChangeText={handleChange('firstName')}
                          style={{
                            height: 40,
                            width: '48%',
                            backgroundColor: 'transparent',
                            color: '#fff',
                            borderBottomWidth: 1,
                            borderColor: 'gray',
                          }}
                        />
                        <TextInput
                          placeholder="Last Name"
                          placeholderTextColor="#ddd0ff"
                          nativeID="lastName"
                          value={values.lastName}
                          onChangeText={handleChange('lastName')}
                          style={{
                            height: 40,
                            width: '48%',
                            backgroundColor: 'transparent',
                            color: '#fff',
                            borderBottomWidth: 1,
                            borderColor: 'gray',
                          }}
                        />
                      </View>
                      <View
                        style={{
                          height: 40,
                          color: '#fff',
                          borderBottomWidth: 1,
                          borderColor: 'gray',
                          marginTop: 10,
                        }}>
                        <Text
                          style={{
                            color: '#fff',
                          }}>
                          Select your gender:
                        </Text>
                        <Picker
                          onValueChange={handleChange('gender')}
                          selectedValue={values.gender}
                          style={{
                            color: '#fff',
                          }}>
                          <Picker.Item label="Male" value="MALE" />
                          <Picker.Item label="Female" value="FEMALE" />
                          <Picker.Item label="Other" value="OTHERS" />
                        </Picker>
                      </View>
                      <TouchableOpacity
                        style={{
                          marginTop: 20,
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'center',
                        }}
                        onPress={handleSubmit}>
                        <View
                          style={{
                            height: 40,
                            width: 120,
                            backgroundColor: '#956956',
                            alignItems: 'center',
                            borderRadius: 20,
                          }}>
                          <Text
                            style={{
                              color: '#fff',
                              marginTop: 10,
                            }}>
                            Update
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </Formik>
            </ScrollView>
          </SafeAreaView>
        )}
      </Mutation>
    </Gradient>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
