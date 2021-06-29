import React from 'react';
import { auth } from '../../firebase';

type ProfileInfoProps = {
  user: User;
};

const ProfileInfo: React.FunctionComponent<ProfileInfoProps> = (props: ProfileInfoProps) => {
  return (
    <div className="roundedContainer">
      <small>You are signed in as</small>
      <strong>{props.user.email}</strong>
      <button className="btn" onClick={() => auth.signOut()}>
        Sign out
      </button>
    </div>
  );
};

export default ProfileInfo;
