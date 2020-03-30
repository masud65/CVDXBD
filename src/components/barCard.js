import React, {Component} from 'react';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Icon,
  Right,
  View,
} from 'native-base';
import BarCharts from './barChart';

export default class BardCard extends Component {
  render() {
    return (
      <>
        <Content>
          <Card>
            <Text>Chart by day</Text>
            <CardItem>
              <View style={{marginLeft: '-2.5%'}}>
                <BarCharts />
              </View>
            </CardItem>
          </Card>
        </Content>
      </>
    );
  }
}
