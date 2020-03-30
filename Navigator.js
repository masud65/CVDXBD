import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';
import {
  BdPage,
  ProfilePage,
  WorldPage,
  SignInPage,
  SignUpPage,
  NewsPage,
  NewsSinglePage,
  AdminNewsPage,
  AdminEmergencyPage,
  TANDCPage,
  AboutUsPage,
  UpdateProfilePage,
  EditNewsPage,
  EditEmergencyPage,
  LandingPage,
} from './Screens';
import CustomDrawerContent from './src/components/customDrawerContent';
import User from './context';

const Tabs = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const WorldStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const SignStack = createStackNavigator();
const NewsStack = createStackNavigator();
const ShareStack = createStackNavigator();
const AdminOneStack = createStackNavigator();
const AdminTwoStack = createStackNavigator();
const TermsStack = createStackNavigator();
const AboutStack = createStackNavigator();

const MyTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#ddd',
    background: '#141d26',
    card: '#252668',
    text: '#fff',
    border: '#0c131a',
  },
};

const HomeStackScreen = ({navigation, route}) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        shadowOpacity: 0,
        elevation: 0,
      },
      headerRight: () => (
        <Entypo
          onPress={() => navigation.toggleDrawer()}
          name={'menu'}
          size={30}
          color={'#fff'}
        />
      ),
    }}>
    <HomeStack.Screen name="COVID19: Bangladesh" component={BdPage} />
    <HomeStack.Screen name="Edit Emergency" component={EditEmergencyPage} />
  </HomeStack.Navigator>
);

const WorldStackScreen = ({navigation}) => (
  <WorldStack.Navigator
    screenOptions={{
      headerStyle: {
        shadowOpacity: 0,
        elevation: 0,
      },
      headerRight: () => (
        <Entypo
          onPress={() => navigation.toggleDrawer()}
          name={'menu'}
          size={30}
          color={'#fff'}
        />
      ),
    }}>
    <WorldStack.Screen name="COVID19: Global" component={WorldPage} />
  </WorldStack.Navigator>
);

const ProfileStackScreen = ({navigation}) => (
  <ProfileStack.Navigator
    screenOptions={{
      headerRight: () => (
        <Entypo
          onPress={() => navigation.toggleDrawer()}
          name={'menu'}
          size={30}
          color={'#fff'}
        />
      ),
    }}>
    <ProfileStack.Screen name="ProfilePage" component={ProfilePage} />
    <ProfileStack.Screen name="Update Profile" component={UpdateProfilePage} />
  </ProfileStack.Navigator>
);
const NewsStackScreen = ({navigation}) => (
  <NewsStack.Navigator
    screenOptions={{
      headerRight: () => (
        <Entypo
          onPress={() => navigation.toggleDrawer()}
          name={'menu'}
          size={30}
          color={'#fff'}
        />
      ),
    }}>
    <NewsStack.Screen name="News" component={NewsPage} />
    <NewsStack.Screen name="NewsDetails" component={NewsSinglePage} />
    <NewsStack.Screen name="Edit News" component={EditNewsPage} />
  </NewsStack.Navigator>
);
const ShareStackScreen = ({navigation}) => (
  <ShareStack.Navigator
    screenOptions={{
      headerRight: () => (
        <Entypo
          onPress={() => navigation.toggleDrawer()}
          name={'menu'}
          size={30}
          color={'#fff'}
        />
      ),
    }}>
    <ShareStack.Screen name="Share App" component={LandingPage} />
  </ShareStack.Navigator>
);

const TabsScreen = () => (
  <Tabs.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        let iconName;

        if (route.name === 'BD') {
          iconName = focused ? 'home' : 'home';
        } else if (route.name === 'World') {
          iconName = focused ? 'globe' : 'globe';
        } else if (route.name === 'News') {
          iconName = focused ? 'note' : 'note';
        }
        return <Octicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeBackgroundColor: '#141d26',
      inactiveBackgroundColor: '#141d26',
      activeTintColor: '#778dd8',
      inactiveTintColor: '#2c848c',
    }}>
    <Tabs.Screen name="BD" component={HomeStackScreen} />
    <Tabs.Screen name="World" component={WorldStackScreen} />
    <Tabs.Screen name="News" component={NewsStackScreen} />
  </Tabs.Navigator>
);
export const SignStackScreen = ({navigation}) => (
  <SignStack.Navigator
    screenOptions={{
      headerRight: () => (
        <Entypo
          onPress={() => navigation.toggleDrawer()}
          name={'menu'}
          size={30}
          color={'#fff'}
        />
      ),
    }}>
    <SignStack.Screen name="SignIn" component={SignInPage} />
    <SignStack.Screen name="SignUp" component={SignUpPage} />
  </SignStack.Navigator>
);
const AdminOneStackScreen = ({navigation, route}) => (
  <AdminOneStack.Navigator
    screenOptions={{
      headerRight: () => (
        <Entypo
          onPress={() => navigation.toggleDrawer()}
          name={'menu'}
          size={30}
          color={'#fff'}
        />
      ),
    }}>
    <AdminOneStack.Screen name="Update News" component={AdminNewsPage} />
  </AdminOneStack.Navigator>
);
const AdminTwoStackScreen = ({navigation, route}) => (
  <AdminTwoStack.Navigator
    screenOptions={{
      headerRight: () => (
        <Entypo
          onPress={() => navigation.toggleDrawer()}
          name={'menu'}
          size={30}
          color={'#fff'}
        />
      ),
    }}>
    <AdminTwoStack.Screen
      name="Update Emergency"
      component={AdminEmergencyPage}
    />
  </AdminTwoStack.Navigator>
);
const TermsStackScreen = ({navigation, route}) => (
  <TermsStack.Navigator
    screenOptions={{
      headerRight: () => (
        <Entypo
          onPress={() => navigation.toggleDrawer()}
          name={'menu'}
          size={30}
          color={'#fff'}
        />
      ),
    }}>
    <TermsStack.Screen name="Terms & Condition" component={TANDCPage} />
  </TermsStack.Navigator>
);
const AboutStackScreen = ({navigation, route}) => (
  <AboutStack.Navigator
    screenOptions={{
      headerRight: () => (
        <Entypo
          onPress={() => navigation.toggleDrawer()}
          name={'menu'}
          size={30}
          color={'#fff'}
        />
      ),
    }}>
    <AboutStack.Screen name="About Us" component={AboutUsPage} />
  </AboutStack.Navigator>
);

export default class Navigator extends Component {
  render() {
    return (
      <NavigationContainer theme={MyTheme}>
        <User>
          {({data, loading, error}) => {
            let me = data ? data.me : null;
            if (me !== null && me.userGroup === 'USER') {
              return (
                <Drawer.Navigator
                  drawerContent={props => <CustomDrawerContent {...props} />}>
                  <Drawer.Screen name="Home" component={TabsScreen} />
                  <Drawer.Screen
                    name="Profile"
                    component={ProfileStackScreen}
                  />
                  <Drawer.Screen
                    name="Terms & Condition"
                    component={TermsStackScreen}
                  />
                  <Drawer.Screen name="About Us" component={AboutStackScreen} />
                  <Drawer.Screen
                    name="Share App"
                    component={ShareStackScreen}
                  />
                </Drawer.Navigator>
              );
            } else if (me !== null && me.userGroup === 'ADMIN') {
              return (
                <Drawer.Navigator
                  drawerContent={props => <CustomDrawerContent {...props} />}>
                  <Drawer.Screen name="Home" component={TabsScreen} />
                  <Drawer.Screen
                    name="Profile"
                    component={ProfileStackScreen}
                  />
                  <Drawer.Screen
                    name="Update News"
                    component={AdminOneStackScreen}
                  />
                  <Drawer.Screen
                    name="Update Emergency"
                    component={AdminTwoStackScreen}
                  />
                  <Drawer.Screen
                    name="Share App"
                    component={ShareStackScreen}
                  />
                </Drawer.Navigator>
              );
            } else {
              return (
                <Drawer.Navigator>
                  <Drawer.Screen name="Home" component={TabsScreen} />

                  <Drawer.Screen name="Sign In" component={SignStackScreen} />
                  <Drawer.Screen
                    name="Terms & Condition"
                    component={TermsStackScreen}
                  />
                  <Drawer.Screen name="About Us" component={AboutStackScreen} />
                  <Drawer.Screen
                    name="Share App"
                    component={ShareStackScreen}
                  />
                </Drawer.Navigator>
              );
            }
          }}
        </User>
      </NavigationContainer>
    );
  }
}
