import React, {useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  FlatList,
  Picker,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {gql} from 'apollo-boost';
import {useQuery} from '@apollo/react-hooks';
import {Mutation, Query} from '@apollo/react-components';
import {withApollo} from 'react-apollo';
import {GET_CURRENT_USER} from '../../src/screens/profile';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Gradient from '../components/common/GradientBack';

const GET_ALL_EMERGENCY = gql`
  query GET_ALL_EMERGENCY($district: String, $skip: Int, $itemPerPage: Int) {
    getAllEmergency(
      district: $district
      skip: $skip
      itemPerPage: $itemPerPage
    ) {
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
function Item({navigation, item}) {
  const {loading, error, data} = useQuery(GET_CURRENT_USER);
  let me = data ? data.me : null;
  let {id, name, mobile, email, messenger, address} = item;
  return (
    <ContainerTag>
      <BigText color={'#fff'}>{name}</BigText>
      {me !== null && me.userGroup === 'ADMIN' && (
        <AdminControlTag>
          <TouchableOpacity>
            <MaterialIcons name={'delete'} color={'#fff'} size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Edit Emergency', {
                item,
              })
            }>
            {me !== null && me.userGroup === 'ADMIN' && (
              <Text style={{color: '#fff'}}>Update</Text>
            )}
          </TouchableOpacity>
        </AdminControlTag>
      )}
      <DetailsTag>
        <AddressTag>
          <Text style={{color: '#fff', minHeight: 30, margin: 0, padding: 0}}>
            {`${address.street}${address.street && ','} ${
              address.city
            }${address.city && ','} ${address.district}`}
          </Text>
          <Text style={{color: '#fff'}}>{email && email}</Text>
        </AddressTag>
        <CallTag>
          <Feather style={{color: '#28b778'}} name={'phone-call'} size={35} />
        </CallTag>
      </DetailsTag>
    </ContainerTag>
  );
}
function Scrolling(props) {
  return (
    <Query
      query={GET_ALL_EMERGENCY}
      pollInterval={1000}
      variables={{...props.values, district: props.values.selectedValue}}>
      {({data, loading, error}) => {
        if (loading) return <Text>Loading</Text>;
        if (error) return <Text>Something went wrong.</Text>;
        return (
          <FlatList
            style={{marginBottom: 50}}
            data={data.getAllEmergency}
            renderItem={({item}) => (
              <Item item={item} navigation={props.navigation} />
            )}
            // keyExtractor={item => item.mobile}
          />
        );
      }}
    </Query>
  );
}

class Emergency extends React.Component {
  state = {
    districts: [],
    selectedValue: 'all',
    skip: 0,
    itemPerPage: 20,
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

  handleVariables = value => {
    this.setState(prevState => ({
      ...prevState,
      selectedValue: value,
    }));
  };

  render() {
    return (
      <Gradient>
        <SafeAreaView>
          <Picker
            onValueChange={itemValue => this.handleVariables(itemValue)}
            selectedValue={this.state.selectedValue}
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
                <Picker.Item key={i.code} label={i.name} value={i.code} />
              ))}
          </Picker>
          <Scrolling navigation={this.props.navigation} values={this.state} />
        </SafeAreaView>
      </Gradient>
    );
  }
}

export default withApollo(Emergency);

const ContainerTag = styled.View`
  width: 95%;
  min-height: 50px;
  background: #39445a;
  margin: 10px;
  padding: 10px;
`;

const DetailsTag = styled.View`
  padding: 10px;
  min-height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const AddressTag = styled.View`
  width: 70%;
  height: 100%;
`;

const BigText = styled.Text`
  font-size: 18px;
  margin-bottom: 5px;
  color: ${props => props.color || '#373737'};
  font-weight: bold;
  line-height: 40px;
  border-bottom-width: 1px;
  border-bottom-color: #ddd;
`;

const SmallText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
`;

const AdminControlTag = styled.View`
  width: 100%;
  height: 50px;
  border-bottom-width: 1px;
  border-bottom-color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
`;

const CallTag = styled.View`
  width: 100%;
  min-height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
`;
