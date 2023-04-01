import React from 'react';

import { COLORS, SIZE, SIZES } from '../utils/theme';
import { Row } from './Row';
import { Text } from './Text';

export const ListEmptyComponent = ({ text }) => {
  return (
    <Row alignCenter style={{ marginTop: SIZE * 3 }}>
      <Text color={COLORS.gray} medium style={{ fontSize: SIZES.sm, textAlign: 'center' }}>
        {text}
      </Text>
    </Row>
  );
};
