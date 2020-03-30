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
import {Formik, useFormik} from 'formik';
import {Mutation, Query} from '@apollo/react-components';
import {gql} from 'apollo-boost';
import {renderToStringWithData, withApollo} from 'react-apollo';
import Gradient from '../components/common/GradientBack';

const CREATE_NOTICE = gql`
  mutation CREATE_NOTICE($data: CreateNoticeInput!) {
    createNotice(data: $data) {
      id
      title
      slug
      details
      tags
      country
      source
      status
      noticeType
      createdAt
      updatedAt
    }
  }
`;

class NoticeCreate extends React.Component {
  render() {
    return (
      <Gradient>
        <>
          <Mutation mutation={CREATE_NOTICE}>
            {(createNotice, {error, loading}) => (
              <SafeAreaView>
                <ScrollView>
                  <Formik
                    initialValues={{
                      title: '',
                      details: '',
                      tags: [],
                      country: '',
                      source: '',
                      status: '',
                      noticeType: '',
                    }}
                    onSubmit={async (values, actions) => {
                      actions.setSubmitting(true);
                      const {
                        title,
                        details,
                        tags,
                        country,
                        source,
                        status,
                        noticeType,
                      } = values;

                      const response = await createNotice({
                        variables: {
                          data: values,
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
                            Create Notice
                          </Text>
                        </View>
                        <View>
                          <TextInput
                            placeholder="Title"
                            placeholderTextColor="#ddd0ff"
                            value={values.title}
                            onChangeText={handleChange('title')}
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
                            placeholder="Details"
                            placeholderTextColor="#ddd0ff"
                            value={values.details}
                            onChangeText={handleChange('details')}
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
                            placeholder="Country"
                            placeholderTextColor="#ddd0ff"
                            value={values.country}
                            onChangeText={handleChange('country')}
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
                            placeholder="Source"
                            placeholderTextColor="#ddd0ff"
                            value={values.source}
                            onChangeText={handleChange('source')}
                            style={{
                              height: 40,
                              backgroundColor: 'transparent',
                              color: '#fff',
                              borderBottomWidth: 1,
                              borderColor: 'gray',
                              marginTop: 10,
                            }}
                          />
                          {/* <TextInput
                            placeholder="Status"
                            placeholderTextColor="#ddd0ff"
                            value={values.status}
                            onChangeText={handleChange('status')}
                            style={{
                              height: 40,
                              backgroundColor: 'transparent',
                              color: '#fff',
                              borderBottomWidth: 1,
                              borderColor: 'gray',
                              marginTop: 10,
                            }}
                          /> */}
                          <Picker
                            onValueChange={handleChange('status')}
                            selectedValue={values.status}
                            style={{
                              color: '#fff',
                            }}>
                            <Picker.Item label="Publish" value="PUBLISH" />
                            <Picker.Item label="Draft" value="DRAFT" />
                          </Picker>
                          {/* <TextInput
                            placeholder="Notice Type"
                            placeholderTextColor="#ddd0ff"
                            value={values.noticeType}
                            onChangeText={handleChange('noticeType')}
                            style={{
                              height: 40,
                              backgroundColor: 'transparent',
                              color: '#fff',
                              borderBottomWidth: 1,
                              borderColor: 'gray',
                              marginTop: 10,
                            }}
                          /> */}
                          <Picker
                            onValueChange={handleChange('noticeType')}
                            selectedValue={values.noticeType}
                            style={{
                              color: '#fff',
                            }}>
                            <Picker.Item label="National" value="NAT" />
                            <Picker.Item label="International" value="INT" />
                          </Picker>

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
                                Create Notice
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

export default withApollo(NoticeCreate);

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
