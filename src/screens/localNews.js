import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import styled from 'styled-components';
import gql from 'graphql-tag';
import {useQuery, useMutation} from '@apollo/react-hooks';
import {GET_CURRENT_USER} from '../../src/screens/profile';
import {Mutation} from '@apollo/react-components';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Gradient from '../components/common/GradientBack';
import {Button} from 'native-base';

const GET_All_Local_NOTICE = gql`
  query GET_All_Local_NOTICE(
    $status: String
    $skip: Int
    $itemPerPage: Int
    $noticeType: String
  ) {
    getAllNotice(
      status: $status
      skip: $skip
      itemPerPage: $itemPerPage
      noticeType: $noticeType
    ) {
      notices {
        id
        title
        slug
        source
        details
        country
        status
        noticeType
      }
      skip
      count
    }
  }
`;
const DELETE_NOTICE = gql`
  mutation deleteNotice($id: String) {
    deleteNotice(id: $id)
  }
`;

function Item({navigation, it: item}) {
  const {loading, error, data} = useQuery(GET_CURRENT_USER);
  let me = data ? data.me : null;
  let {id, title, slug, details, source, country, noticeType, status} = item;
  return (
    <ContainerTag>
      <View>
        <BigText color={'#fff'}>{title}</BigText>
        {me !== null && me.userGroup === 'ADMIN' && (
          <Mutation mutation={DELETE_NOTICE}>
            {(deleteNotice, {data, loading, error}) => (
              <TouchableOpacity
                onPress={async () => {
                  const delte = await deleteNotice({
                    variables: {
                      id,
                    },
                  });

                  if (delte.data.deleteNotice === true) {
                    alert('success!');
                  } else {
                    alert('Duh!');
                  }

                  //   return delte;
                }}>
                <MaterialIcons name={'delete'} color={'#fff'} size={20} />
              </TouchableOpacity>
            )}
          </Mutation>
        )}

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Edit News', {
              item,
            })
          }>
          {me !== null && me.userGroup === 'ADMIN' && <Text>Update</Text>}
        </TouchableOpacity>
      </View>

      <Text></Text>
      <DetailsTag>
        <AddressTag>
          <Text style={{color: '#fff'}}>{details}</Text>
          <Text style={{color: '#fff'}}>{source}</Text>
        </AddressTag>
        <View style={{alignSelf: 'flex-end'}}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('NewsDetails', {
                title,
                details,
              })
            }>
            <Text
              style={{
                color: '#fff',
              }}>
              see more
            </Text>
          </TouchableOpacity>
        </View>
      </DetailsTag>
    </ContainerTag>
  );
}

const Notices = props => (
  <FlatList
    data={props.entries}
    // initialNumToRender={1}

    renderItem={({item}) => (
      <>
        {item.map(i => (
          <Item navigation={props.navigation} it={i} />
        ))}
      </>
    )}
    onEndReached={async () => {
      let findSkip = (ac, cur) => ac + cur.length;
      let totalSkip = props.entries.reduce(findSkip, 0);
      console.log(totalSkip);
      console.log('count', props.totalItem);

      if (props.totalItem > totalSkip) {
        return await props.onLoadMore(totalSkip);
      } else {
        console.log('you reach end');
        return null;
      }
    }}
    ListFooterComponent={() => {
      let findSkip = (ac, cur) => ac + cur.length;
      let totalSkip = props.entries.reduce(findSkip, 0);

      if (props.totalItem > totalSkip) {
        return <ActivityIndicator size="large" color="#fff" />;
      } else {
        console.log('you reach end');
        return null;
      }
    }}
    // ListFooterComponent={() => (
    //   <Button
    //     onPress={async () => {
    //       let findSkip = (ac, cur) => ac + cur.length;
    //       let totalSkip = props.entries.reduce(findSkip, 0);
    //       console.log(totalSkip);
    //       console.log('count', props.totalItem);

    //       if (props.totalItem > totalSkip) {
    //         return await props.onLoadMore(totalSkip);
    //       } else {
    //         console.log('you reach end');
    //         return null;
    //       }
    //     }}
    //     title="load More"
    //   />
    // )}
    keyExtractor={item => item[0].id}
  />
);

export default function LocalNews(props) {
  const [notices, setNotices] = useState([]);
  const [count, setCount] = useState(0);

  const {data, loading, error, client} = useQuery(GET_All_Local_NOTICE, {
    variables: {
      status: 'PUBLISH',
      skip: 0,
      itemPerPage: 10,
      noticeType: 'NAT',
    },

    onCompleted: () => {
      setNotices([data.getAllNotice.notices]);
      setCount(data.getAllNotice.count);
    },
  });

  const loadMore = async skipItem => {
    console.log('item-', skipItem);

    const newNotice = await client.query({
      query: gql`
        query GET_NOTICE(
          $status: String
          $skip: Int
          $itemPerPage: Int
          $noticeType: String
        ) {
          getAllNotice(
            noticeType: $noticeType
            status: $status
            skip: $skip
            itemPerPage: $itemPerPage
          ) {
            notices {
              id
              source
              title
              slug
              details
              noticeType
              country
              status
            }
            skip
          }
        }
      `,
      variables: {
        status: 'PUBLISH',
        skip: skipItem,
        itemPerPage: 10,
        noticeType: 'NAT',
      },
    });

    setNotices([...notices, newNotice.data.getAllNotice.notices]);
  };

  if (loading) return <Text style={{color: '#fff'}}>Loading...</Text>;
  if (error) return <Text style={{color: '#fff'}}>{error.message} :(</Text>;
  if (!data) return <Text>No Data</Text>;
  return (
    <SafeAreaView>
      <Notices
        entries={notices}
        onLoadMore={loadMore}
        navigation={props.navigation}
        totalItem={count}
      />
    </SafeAreaView>
  );
}

const ContainerTag = styled.View`
  width: 95%;
  min-height: 50px;
  background: #21273f;
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
  width: 100%;
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
