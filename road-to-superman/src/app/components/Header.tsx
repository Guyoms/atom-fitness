"use client"
import React from 'react';
import AuthGoogle from './auth/google.auth';
import { useProfileContext } from '@/contexts/profile.context';
import { Card, CardBody, User } from '@heroui/react';
import { useApp } from '../context/AppContext';

const Header = () => {
  const { profile } = useProfileContext()
  const profileData = profile.get()
  const { userData } = useApp();

  const handleSignOut = () => {
    console.log("signing out");
  }

  return (
    <header className="header fade-in">
      <div className="logo-text">
        <span className="road-to">ROAD TO</span>
        <span className="superman">SUPERMAN</span>
      </div>
      {profileData && (
        <div className="flex justify-center items-center mt-2">
          <Card className="bg-[#1d273a] border border-[#2c3a54]" isPressable onPress={handleSignOut}>
            <CardBody>
              <User
                avatarProps={{ src: profileData.avatar || '' }}
                name={profileData.username || ''}
                description={profileData.email || ''} />
            </CardBody>
          </Card>
        </div>
      )}
      {!profileData && (
        <div className="flex justify-end">
          <AuthGoogle />
        </div>
      )}
      <p className="subtitle">De <span id="start-weight">{userData.startWeight}</span>kg à <span id="target-weight">{userData.targetWeight}</span>kg | <span id="start-fat">{userData.startFat}</span>% → <span id="target-fat">{userData.targetFat}</span>% MG</p>
      <div className="progress-bar">
        <div className="progress-fill" id="progress-fill"></div>
      </div>
    </header>
  );
};

export default Header; 