import React, {Component} from 'react';
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {gql} from 'apollo-boost';
import {useMutation} from '@apollo/react-hooks';
import {Mutation} from '@apollo/react-components';
import {withApollo} from 'react-apollo';
import {GET_CURRENT_USER} from '../screens/profile';

const LOGOUT = gql`
  mutation {
    signout
  }
`;

class CustomDrawerContent extends React.Component {
  handleSignout = async signout => {
    const logout = await signout();
    this.props.navigation.navigate('Home');
  };
  render() {
    return (
      <DrawerContentScrollView {...this.props}>
        <DrawerItemList {...this.props} label="kdfjkfj" />
        <Mutation
          mutation={LOGOUT}
          onCompleted={() => {
            this.props.client.clearStore().then(() => {
              this.props.client.resetStore();
            });
          }}>
          {signout => (
            <DrawerItem
              label="Sign Out"
              onPress={async () => await this.handleSignout(signout)}
            />
          )}
        </Mutation>
      </DrawerContentScrollView>
    );
  }
}

export default withApollo(CustomDrawerContent);
// export function logOut() {
//   const {loading, error, data} = useMutation(LOGOUT);
//   if (error) {
//     return 'hsdjfhd';
//   }
// }
