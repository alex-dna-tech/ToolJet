import React from 'react';
import { ButtonSolid } from '@/_components/AppButton';
import { useHistory } from 'react-router-dom';

export const LinkExpiredInfoScreen = function LinkExpiredInfoScreen() {
  const history = useHistory();

  return (
    <div className="info-screen-wrapper">
      <div className="link-expired-card">
        <img
          className="info-screen-email-img"
          src={'assets/images/onboardingassets/Illustrations/Verification failed.svg'}
          alt="email image"
        />
        <h1 className="common-auth-section-header">Invalid verification link</h1>
        <p className="info-screen-description">This verification link is invalid.</p>
        <ButtonSolid variant="secondary" className="link-expired-info-btn" onClick={() => history.push('/signup')}>
          Back to signup
        </ButtonSolid>
      </div>
    </div>
  );
};