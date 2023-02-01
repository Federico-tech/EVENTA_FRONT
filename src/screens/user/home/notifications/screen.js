import React from 'react';
import { useTranslation } from 'react-i18next';

import { Container, Header } from '../../../../components';

export const NotificationsScreen = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <Header title={t('notifications')} />
    </Container>
  );
};
