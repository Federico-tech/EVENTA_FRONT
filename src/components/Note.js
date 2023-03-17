import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { fire, unfire } from '../services/notes';
import { COLORS, FONTS, SHADOWS, SIZE, SIZES } from '../utils/theme';
import { LoadingImage } from './LoadingImage';
import { Row } from './Row';
import { Text } from './Text';

export const Note = ({ data }) => {

  const [isFire, setIsFire] = useState();
  const [numFires, setNumFires] = useState()
  
  useEffect(() => {
    setIsFire(data.hasFired)
    setNumFires(data.fires)
  }, [data])

  const onPressFire = () => {
    fire(data._id);
    setIsFire(true);
    setNumFires(numFires + 1)
  };

  const onPressUnfire = () => {
    unfire(data._id);
    setIsFire(false);
    setNumFires(numFires - 1)
  };

  return (
    <Row justifyCenter>
      <View>
        <View style={styles.note}>
          <Row row alignCenter spaceBetween>
            <LoadingImage source={data?.user.profilePic} style={styles.noteImage} profile width={SIZE * 3} />
            <TouchableOpacity onPress={isFire ? onPressUnfire : onPressFire}>
              <Row row alignCenter>
                <Text regularSm style={{ fontFamily: FONTS.medium}}>{numFires}</Text>
                <MaterialIcons name="local-fire-department" size={SIZE * 1.7} color={isFire ? 'darkorange' : 'black'} />
              </Row>
            </TouchableOpacity>
          </Row>
          <Text semiBoldSm numberOfLines={1} ellipsizeMode="tail" style={{ marginTop: SIZE / 2 }}>
            {data.user.username}
          </Text>
          <Text numberOfLines={3} ellipsizeMode="tail" style={{ fontSize: SIZES.xs, marginTop: SIZE / 3, marginRight: SIZE }}>
            {data.content}
          </Text>
        </View>
      </View>
    </Row>
  );
};

const styles = StyleSheet.create({
  note: {
    backgroundColor: COLORS.white,
    width: SIZE * 10.5,
    aspectRatio: 1,
    borderRadius: SIZES.xxs,
    padding: SIZE / 1.5,
    marginHorizontal: SIZE / 6,
    marginRight: SIZE,
    ...SHADOWS.medium,
  },
  noteImage: {
    width: SIZE * 3,
    aspectRatio: 1,
    borderRadius: 100,
    marginRight: SIZE * 2,
  },
});
