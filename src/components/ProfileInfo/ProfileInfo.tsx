import React from 'react';

type ProfileInfoProps = {
  user: User;
  signOut: () => void;
};

const ProfileInfo: React.FunctionComponent<ProfileInfoProps> = (props: ProfileInfoProps) => {

  const { user, signOut } = props;

  return (
    <div className="roundedContainer">
      <small>You are signed in as</small>
      <strong>{user.email}</strong>
      <button className="btn" onClick={() => signOut()}>
        Sign out
      </button>
    </div>
  );
};

export default ProfileInfo;
