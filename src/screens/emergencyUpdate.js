import React, {Component, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ImageBackground,
  Button,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Picker,
} from 'react-native';
import Input from '../components/common/Input';
import {Formik, useFormik} from 'formik';
import {Mutation, Query} from '@apollo/react-components';
import {gql} from 'apollo-boost';
import {renderToStringWithData, withApollo} from 'react-apollo';
import Gradient from '../components/common/GradientBack';

const GET_ALL_DISTRICT = gql`
  query GET_ALL_DISTRICT {
    getAllDistrict {
      id
      name
      code
    }
  }
`;

const CREATE_EMERGENCY = gql`
  mutation CREATE_EMERGENCY(
    $name: String!
    $mobile: String!
    $street: String
    $city: String
    $district: String
    $division: String
    $country: String
    $tags: [String]
    $email: String
    $messenger: String
  ) {
    createEmergency(
      name: $name
      mobile: $mobile
      street: $street
      city: $city
      district: $district
      division: $division
      country: $country
      tags: $tags
      email: $email
      messenger: $messenger
    ) {
      id
      name
      mobile
      address {
        street
        city
        district
        division
        country
      }
      email
      messenger
      tags
    }
  }
`;

class EmergencyCreate extends React.Component {
  state = {
    districts: [],
  };
  async componentDidMount() {
    let response = await this.props.client.query({
      query: gql`
        query GET_ALL_DISTRICT {
          getAllDistrict {
            id
            name
            code
          }
        }
      `,
    });

    this.setState(prevState => ({
      ...prevState,
      districts: response.data.getAllDistrict,
    }));
  }

  render() {
    return (
      <Gradient>
        <>
          <Mutation mutation={CREATE_EMERGENCY}>
            {(createEmergency, {error, loading}) => (
              <SafeAreaView>
                <ScrollView>
                  <Formik
                    initialValues={{
                      name: '',
                      mobile: '',
                      street: '',
                      city: '',
                      district: '',
                      division: '',
                      country: '',
                      tags: [],
                      email: '',
                      messenger: '',
                    }}
                    onSubmit={async (data, actions) => {
                      actions.setSubmitting(true);
                      const {
                        name,
                        mobile,
                        street,
                        city,
                        district,
                        division,
                        tags,
                        email,
                        messenger,
                      } = data;

                      const response = await createEmergency({
                        variables: {
                          ...data,
                          country: 'BD',
                        },
                      });
                      alert(response);
                      actions.resetForm();
                      actions.setSubmitting(false);
                      console.log(response);
                    }}>
                    {({
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      values,
                      isSubmitting,
                    }) => (
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
                            Create Emergency
                          </Text>
                        </View>
                        <View>
                          <TextInput
                            placeholder="Name"
                            placeholderTextColor="#ddd0ff"
                            value={values.name}
                            onChangeText={handleChange('name')}
                            style={{
                              height: 40,
                              backgroundColor: 'transparent',
                              color: '#fff',
                              borderBottomWidth: 1,
                              borderColor: 'gray',
                              marginTop: 10,
                            }}
                          />
                          <TextInput
                            placeholder="mobile"
                            placeholderTextColor="#ddd0ff"
                            value={values.mobile}
                            onChangeText={handleChange('mobile')}
                            style={{
                              height: 40,
                              backgroundColor: 'transparent',
                              color: '#fff',
                              borderBottomWidth: 1,
                              borderColor: 'gray',
                              marginTop: 10,
                            }}
                          />
                          <TextInput
                            placeholder="street"
                            placeholderTextColor="#ddd0ff"
                            value={values.street}
                            onChangeText={handleChange('street')}
                            style={{
                              height: 40,
                              backgroundColor: 'transparent',
                              color: '#fff',
                              borderBottomWidth: 1,
                              borderColor: 'gray',
                              marginTop: 10,
                            }}
                          />
                          <TextInput
                            placeholder="city"
                            placeholderTextColor="#ddd0ff"
                            value={values.city}
                            onChangeText={handleChange('city')}
                            style={{
                              height: 40,
                              backgroundColor: 'transparent',
                              color: '#fff',
                              borderBottomWidth: 1,
                              borderColor: 'gray',
                              marginTop: 10,
                            }}
                          />

                          <Picker
                            onValueChange={handleChange('district')}
                            selectedValue={values.district}
                            style={{
                              height: 40,
                              backgroundColor: 'transparent',
                              color: '#fff',
                              borderBottomWidth: 1,
                              borderColor: 'gray',
                              marginTop: 10,
                            }}>
                            <Picker.Item
                              label="Select a District"
                              value="all"
                            />
                            {this.state.districts &&
                              this.state.districts.map(i => (
                                <Picker.Item
                                  key={i.code}
                                  label={i.name}
                                  value={i.code}
                                />
                              ))}
                          </Picker>

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
                          <TextInput
                            placeholder="messenger"
                            placeholderTextColor="#ddd0ff"
                            value={values.messenger}
                            onChangeText={handleChange('messenger')}
                            style={{
                              height: 40,
                              backgroundColor: 'transparent',
                              color: '#fff',
                              borderBottomWidth: 1,
                              borderColor: 'gray',
                              marginTop: 10,
                            }}
                          />

                          <TouchableOpacity
                            disabled={isSubmitting}
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
                                width: 150,
                                backgroundColor: '#956956',
                                alignItems: 'center',
                                borderRadius: 20,
                              }}>
                              <Text
                                style={{
                                  color: '#fff',
                                  marginTop: 10,
                                }}>
                                Create Emergency
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
        </>
      </Gradient>
    );
  }
}

export default withApollo(EmergencyCreate);

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
