import React, {Component, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Picker,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Input from '../components/common/Input';
import {Formik, useFormik} from 'formik';
import * as Yup from 'yup';
import {Mutation} from '@apollo/react-components';
import {gql} from 'apollo-boost';
import {GET_CURRENT_USER} from './profile';
import Loading from '../components/loadingScreen';
import Gradient from '../components/common/GradientBack';

const REGISTER_USER = gql`
  mutation createUser(
    $email: String
    $mobile: String!
    $password: String!
    $confirmPassword: String!
    $firstName: String!
    $lastName: String!
    $gender: String
    $city: String
    $country: String
  ) {
    createUser(
      email: $email
      mobile: $mobile
      password: $password
      confirmPassword: $confirmPassword
      firstName: $firstName
      lastName: $lastName
      gender: $gender
      city: $city
      country: $country
    ) {
      id
    }
  }
`;
const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .lowercase(),
  password: Yup.string()
    .min(6)
    .max(30)
    .required('Password required.'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Password must match',
  ),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, 'must be 10 digit without 0')
    .required('Required! type without 0. Ex: 1900000000'),
  country: Yup.string('Country can not contain any number'),
  city: Yup.string()
    .max(20, 'Too Long!')
    .required('Required'),
});

export default function SignUp(props) {
  return (
    <Gradient>
      <Mutation
        mutation={REGISTER_USER}
        refetchQueries={[
          {
            query: GET_CURRENT_USER,
          },
        ]}>
        {(createUser, {error, loading}) => (
          <SafeAreaView>
            <ScrollView>
              <Formik
                initialValues={{
                  email: '',
                  mobile: '',
                  password: '',
                  confirmPassword: '',
                  firstName: '',
                  lastName: '',
                  gender: '',
                  city: '',
                  country: 'BD',
                }}
                validationSchema={SignupSchema}
                onSubmit={async (data, actions) => {
                  // e.preventDefault();

                  const response = await createUser({
                    variables: {
                      ...data,
                    },
                  });
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
                          marginTop: 0,
                          maginBottom: 0,
                        }}>
                        <Text style={{color: '#fff', fontSize: 20}}>
                          Sign Up
                        </Text>
                      </View>
                      <View>
                        <View
                          style={{
                            marginTop: 10,
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
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          {errors.firstName && touched.firstName ? (
                            <Text style={{color: 'red'}}>
                              {errors.firstName}
                            </Text>
                          ) : null}
                          {errors.lastName && touched.lastName ? (
                            <Text style={{color: 'red'}}>
                              {errors.lastName}
                            </Text>
                          ) : null}
                        </View>

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
                          placeholder="email"
                          placeholderTextColor="#ddd0ff"
                          nativeID="email"
                          value={values.email}
                          onChangeText={handleChange('email')}
                          style={{
                            height: 40,
                            backgroundColor: 'transparent',
                            color: '#fff',
                            borderBottomWidth: 1,
                            borderColor: 'gray',
                            marginTop: 10,
                          }}
                        />
                        {errors.email && touched.email ? (
                          <Text style={{color: 'red'}}>{errors.email}</Text>
                        ) : null}
                        {/* <TextInput
                        placeholder="gender"
                        placeholderTextColor="#ddd0ff"
                        nativeID="gender"
                        value={values.gender}
                        onChangeText={handleChange('gender')}
                        style={{
                          height: 40,
                          backgroundColor: 'transparent',
                          color: '#fff',
                          borderBottomWidth: 1,
                          borderColor: 'gray',
                          marginTop: 10,
                        }}
                      /> */}
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
                            selectedValue="MALE"
                            style={{
                              color: '#fff',
                            }}>
                            <Picker.Item label="Male" value="MALE" />
                            <Picker.Item label="Female" value="FEMALE" />
                            <Picker.Item label="Other" value="OTHERS" />
                          </Picker>
                        </View>

                        <View
                          style={{
                            marginTop: 10,
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <TextInput
                            placeholder="city"
                            placeholderTextColor="#ddd0ff"
                            nativeID="city"
                            value={values.city}
                            onChangeText={handleChange('city')}
                            style={{
                              height: 40,
                              width: '66%',
                              backgroundColor: 'transparent',
                              color: '#fff',
                              borderBottomWidth: 1,
                              borderColor: 'gray',
                            }}
                          />
                          <Text
                            style={{
                              marginTop: 10,
                              width: '30%',
                              backgroundColor: 'transparent',
                              color: '#fff',
                              borderBottomWidth: 1,
                              borderColor: 'gray',
                            }}>
                            {'  '}
                            Bangladesh
                          </Text>
                        </View>
                        {errors.city && touched.city ? (
                          <Text style={{color: 'red'}}>{errors.city}</Text>
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
                          <Text style={{color: 'red'}}>{errors.password}</Text>
                        ) : null}
                        <TextInput
                          placeholder="Confirm Password"
                          placeholderTextColor="#ddd0ff"
                          secureTextEntry={true}
                          nativeID="confirmPassword"
                          value={values.confirmPassword}
                          onChangeText={handleChange('confirmPassword')}
                          style={{
                            height: 40,
                            backgroundColor: 'transparent',
                            color: '#fff',
                            borderBottomWidth: 1,
                            borderColor: 'gray',
                            marginTop: 10,
                            marginBottom: 10,
                          }}
                        />
                        {errors.confirmPassword && touched.confirmPassword ? (
                          <Text style={{color: 'red'}}>
                            {errors.confirmPassword}
                          </Text>
                        ) : null}
                        <TouchableOpacity
                          style={{
                            marginTop: 10,
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
                              SIGN UP
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
                          Already a member?
                        </Text>
                        <TouchableOpacity
                          onPress={() => props.navigation.navigate('SignIn')}>
                          <Text
                            style={{
                              color: '#fff',
                              marginTop: 10,
                            }}>
                            Sign In
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
    </Gradient>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
