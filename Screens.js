import React from 'react';
import {View} from 'react-native';
import {
  Bd,
  Profile,
  World,
  SignIn,
  SignUp,
  Landing,
  News,
  Emergency,
  LocalNews,
  InterNews,
  DailyData,
  NewsSingle,
  NewsUpdate,
  EmergencyUpdate,
  TandC,
  AboutUs,
  UpdateProfile,
  EditNotice,
  EditEmergency,
} from './src/screens';

const ScreenContainer = ({children}) => (
  <View style={styles.container}>{children}</View>
);

export const BdPage = ({navigation}) => <Bd navigation={navigation} />;
export const ProfilePage = ({navigation}) => (
  <Profile navigation={navigation} />
);
export const WorldPage = ({navigation}) => <World />;
export const SignInPage = ({navigation}) => <SignIn navigation={navigation} />;
export const SignUpPage = ({navigation}) => <SignUp navigation={navigation} />;
export const LandingPage = ({navigation}) => <Landing />;
export const EmergencyPage = ({navigation}) => (
  <Emergency navigation={navigation} />
);
export const NewsPage = ({navigation}) => <News navigation={navigation} />;
export const DailyPage = ({route, navigation}) => <DailyData />;
export const NewsSinglePage = ({route, navigation}) => (
  <NewsSingle navigation={navigation} route={route} />
);
export const EditNewsPage = ({route}) => <EditNotice route={route} />;
export const EditEmergencyPage = ({route}) => <EditEmergency route={route} />;
export const AdminNewsPage = ({navigation}) => <NewsUpdate />;
export const AdminEmergencyPage = ({navigation}) => <EmergencyUpdate />;
export const TANDCPage = ({navigation}) => <TandC />;
export const AboutUsPage = ({navigation}) => <AboutUs />;
export const UpdateProfilePage = ({navigation}) => (
  <UpdateProfile navigation={navigation} />
);
