import { AntDesign, Ionicons, Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { AlertModal, Row, Text } from '../../../../components';
import { ROUTES } from '../../../../navigation/Navigation';
import { FONTS, SIZE, WIDTH_DEVICE } from '../../../../utils/theme';

export const EventDetailsBottomSheet = ({ organiserId, userId, closeSheet }) => {
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isReportModalVisible, setReportModalVisible] = useState(false);
  const navigation = useNavigation();
  const onPressEditEvent = () => {
    navigation.navigate(ROUTES.EditEventScreen);
    closeSheet();
  };

  return (
    <View style={{ marginHorizontal: WIDTH_DEVICE / 20 }}>
      {organiserId === userId ? (
        <>
          <TouchableOpacity onPress={onPressEditEvent}>
            <Row row alignCenter style={{ marginTop: SIZE }}>
              <AntDesign name="edit" size={SIZE * 2} />
              <Text regularSm style={{ marginLeft: SIZE }}>
                Edit this event
              </Text>
            </Row>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setDeleteModalVisible(true)}>
            <Row row alignCenter style={{ marginTop: SIZE }}>
              <Ionicons name="ios-trash-outline" size={SIZE * 2} color="red" />
              <Text color="red" style={{ marginLeft: SIZE, color: 'red', fontFamily: FONTS.semiBold }}>
                Delete event
              </Text>
            </Row>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity onPress={() => setReportModalVisible(true)}>
            <Row row alignCenter style={{ marginTop: SIZE }}>
              <Octicons name="report" size={SIZE * 1.8} color="red" />
              <Text regularSm color="red" style={{ marginLeft: SIZE }}>
                Report
              </Text>
            </Row>
          </TouchableOpacity>
        </>
      )}
      <AlertModal
        isVisible={isDeleteModalVisible}
        onBackdropPress={() => setDeleteModalVisible(false)}
        title="Delete this event ?"
        descritpion="Are you sure you want to delete this event. The action is irreversible."
        confirmText="Delete"
      />
      <AlertModal
        isVisible={isReportModalVisible}
        onBackdropPress={() => setReportModalVisible(false)}
        title="Report this event?"
        descritpion="Thank you for reporting this event. Our team will review the event and take appropriate action as necessary."
        confirmText="Report"
      />
    </View>
  );
};
