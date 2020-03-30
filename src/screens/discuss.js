import React from 'react';
import {Container, Text, StyleProvider} from 'native-base';
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';

const Discuss = () => {
  return (
    <StyleProvider style={getTheme(platform)}>
      <Container>
        <Text>Discussion</Text>
      </Container>
    </StyleProvider>
  );
};

export default Discuss;
