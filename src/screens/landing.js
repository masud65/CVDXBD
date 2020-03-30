import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Share,
} from 'react-native';
import Gradient from '../components/common/GradientBack';

export default class TandC extends Component {
  render() {
    const onShare = async () => {
      try {
        const result = await Share.share({
          message: 'https://www.google.com',
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        alert(error.message);
      }
    };
    return (
      <Gradient>
        <View style={styles.container}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 0,
              maginBottom: 0,
            }}>
            <Text style={{color: '#fff', fontSize: 20, marginTop: 50}}>
              Share the App
            </Text>
            <Text style={{color: '#fff', paddingTop: 20, textAlign: 'center'}}>
              If you have liked our app and want to share this app with your
              friend please Share this app
            </Text>
            <TouchableOpacity onPress={onShare}>
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
                  Share
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Gradient>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    marginStart: 20,
    marginEnd: 20,
  },
});
