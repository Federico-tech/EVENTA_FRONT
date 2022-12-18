import React from 'react';
import { Text, View, FlatList, ScrollView } from 'react-native';
import { EventCard, HomeTop } from '../../components';
import { EventData } from '../../utils/constants/Dummy';
import { WIDTH_DEVICE } from '../../utils/constants/Theme';
import { times } from 'lodash'

const Element = ({i}) => {
  return <View style={{
    width: WIDTH_DEVICE * 0.9,
    height: 200,
    backgroundColor: 'red',
    marginBottom: 10
  }}>
    <Text>
      {i}
    </Text> 
  </View>
}

export const MapScreen = () => {

  const renderItem = (i) =>  <Element i={i} key={i} />

  return (
      <ScrollView contentContainerStyle={{alignSelf: 'center'}}>
        {times(50, renderItem)}
      </ScrollView>
    ) 
};
