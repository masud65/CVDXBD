import React, {Component, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  ScrollView,
  SafeAreaView,
  Share,
} from 'react-native';
import {Formik, useFormik} from 'formik';
import {Mutation} from '@apollo/react-components';
import {gql} from 'apollo-boost';
import * as Yup from 'yup';
import {GET_CURRENT_USER} from './profile';
import Loading from '../components/loadingScreen';
import Gradient from '../components/common/GradientBack';

const LOGOUT = gql`
  mutation {
    signout
  }
`;

const LOGIN_USER = gql`
  mutation signin($mobile: String = "", $password: String = "") {
    signin(mobile: $mobile, password: $password) {
      id
      city
    }
  }
`;

const SignInSchema = Yup.object().shape({
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, 'must be 10 digit without 0')
    .required('Required! type without 0. Ex: 1900000000'),
  password: Yup.string()
    .min(8)
    .max(30)
    .required('Password required.'),
});

export default function SignIn(props) {
  return (
    <Gradient>
      <SafeAreaView>
        <Mutation
          mutation={LOGIN_USER}
          refetchQueries={[
            {
              query: GET_CURRENT_USER,
            },
          ]}>
          {(signin, {error, loading, data}) => (
            <SafeAreaView>
              <ScrollView>
                <Formik
                  initialValues={{
                    mobile: '',
                    password: '',
                  }}
                  validationSchema={SignInSchema}
                  onSubmit={async event => {
                    // e.preventDefault();
                    const response = await signin({variables: event});
                    props.navigation.navigate('Home');
                  }}>
                  {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                  }) => {
                    if (loading) return <Loading />;
                    return (
                      <View style={styles.container}>
                        <View
                          style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 50,
                            maginBottom: 0,
                          }}>
                          <Text style={{color: '#fff', fontSize: 20}}>
                            Sign In
                          </Text>
                        </View>

                        <View>
                          <View
                            style={{
                              marginTop: 10,
                              flex: 1,
                              flexDirection: 'row',
                              justifyContent: 'flex-end',
                              borderBottomWidth: 1,
                              borderColor: 'gray',
                            }}>
                            <Text
                              style={{
                                marginTop: 10,
                                width: '15%',
                                backgroundColor: 'transparent',
                                color: '#fff',
                              }}>
                              +880
                            </Text>
                            <TextInput
                              placeholder="Mobile No"
                              placeholderTextColor="#ddd0ff"
                              value={values.mobile}
                              onChangeText={handleChange('mobile')}
                              style={{
                                height: 40,
                                width: '80%',
                                backgroundColor: 'transparent',
                                color: '#fff',
                              }}
                            />
                          </View>
                          {errors.mobile && touched.mobile ? (
                            <Text style={{color: 'red'}}>{errors.mobile}</Text>
                          ) : null}
                          <TextInput
                            placeholder="Password"
                            placeholderTextColor="#ddd0ff"
                            secureTextEntry={true}
                            value={values.password}
                            onChangeText={handleChange('password')}
                            style={{
                              height: 40,
                              backgroundColor: 'transparent',
                              color: '#fff',
                              borderBottomWidth: 1,
                              borderColor: 'gray',
                              marginTop: 10,
                            }}
                          />
                          {errors.password && touched.password ? (
                            <Text style={{color: 'red'}}>
                              {errors.password}
                            </Text>
                          ) : null}
                          {error && (
                            <Text style={{color: 'red', marginTop: 20}}>
                              Incorrect mobile no. or password!{'  '} try agian
                            </Text>
                          )}
                          <TouchableOpacity
                            style={{
                              marginTop: 30,
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
                                SIGN IN
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            marginTop: 10,
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              color: '#fff',
                              marginTop: 10,
                              marginRight: 10,
                            }}>
                            Not a member?
                          </Text>
                          <TouchableOpacity
                            onPress={() => props.navigation.navigate('SignUp')}>
                            <Text
                              style={{
                                color: '#fff',
                                marginTop: 10,
                              }}>
                              Sign Up
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    );
                  }}
                </Formik>
              </ScrollView>
            </SafeAreaView>
          )}
        </Mutation>
      </SafeAreaView>
    </Gradient>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
