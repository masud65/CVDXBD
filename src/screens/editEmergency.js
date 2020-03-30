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
import {renderToStringWithData, withApollo} from 'react-apollo';
import Gradient from '../components/common/GradientBack';

const UPDATE_EMERGENCY = gql`
  mutation updateEmergency($id: String!, $data: UpdateEmergencyInput!) {
    updateEmergency(id: $id, data: $data) {
      id
      name
      mobile
      address {
        street
        city
        district
        division
      }
      email
      messenger
    }
  }
`;

class EditEmergency extends React.Component {
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
    // let response2 = await this.props.client.query({
    //   query: gql`
    //     query GET_EMERGENCY($id: String) {
    //       getEmergency(id: $id) {
    //         id
    //         name
    //         mobile
    //         address {
    //           street
    //           city
    //           district
    //         }
    //         email
    //         messenger
    //       }
    //     }
    //   `,
    //   variables: {
    //     id: this.props.route.params.id,
    //   },
    // });

    this.setState(prevState => ({
      ...prevState,
      districts: response.data.getAllDistrict,
      // item: response2.data.getEmergency
    }));
    // this.setState(prevState => ({
    //   ...prevState,
    //   emergencies: response2.data.getEmergency,
    // }));
  }

  render() {
    let {
      id,
      name,
      mobile,
      email,
      messenger,
      address,
    } = this.props.route.params.item;
    return (
      <>
        <Mutation mutation={UPDATE_EMERGENCY}>
          {(updateEmergency, {error, loading}) => (
            <SafeAreaView>
              <ScrollView>
                <Formik
                  initialValues={{
                    name,
                    mobile,
                    street: address.street,
                    city: address.city,
                    district: address.district,
                    division: address.division,
                    country: '',
                    tags: [],
                    email,
                    messenger,
                  }}
                  onSubmit={async (values, actions) => {
                    actions.setSubmitting(true);
                    const response = await updateEmergency({
                      variables: {
                        data: {
                          ...values,
                        },
                        id,
                      },
                    });
                    actions.resetForm();
                    actions.setSubmitting(false);
                    alert('Success');
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
                          <Picker.Item label="Select a District" value="all" />
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
                              Update Emergency
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
    );
  }
}

export default withApollo(EditEmergency);

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
