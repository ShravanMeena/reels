import React from 'react';
import {View, Text} from 'react-native';
import If from '../components/if';

export default function ConditionallyRender() {
  return (
    <View>
      <If show={true}>
        <Text>I Am Okay!</Text>
      </If>

      <If show={false}>
        <Text>I Am Not Okay!</Text>
      </If>
      
    </View>
  );
}
