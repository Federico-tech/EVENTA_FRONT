import React from 'react';
import { WebView } from 'react-native-webview';

import { Container, Header } from '../../../components';

export const PrivacyPolicyScreen = () => {
  const privacyPolicyUrl = 'https://www.iubenda.com/privacy-policy/21231168';
  return (
    <Container>
      <Header title="Privacy Policy" back />
      <WebView source={{ uri: privacyPolicyUrl }} style={{ flex: 1 }} />
    </Container>
  );
};
