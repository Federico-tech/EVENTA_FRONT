import { View, StyleSheet } from 'react-native';

export const Row = ({ children, flex = 1, justifyContent = undefined, alignItems = undefined }) => {
  return (
    <View collapsable={false} style={[styles.row, { flex, justifyContent, alignItems }]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
});
