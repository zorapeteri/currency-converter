import React from 'react';
import { auth } from '../../firebase';
import { useHistory } from "react-router-dom";

type ProfileInfoProps = {
  user: User;
};

const ProfileInfo: React.FunctionComponent<ProfileInfoProps> = (props: ProfileInfoProps) => {

  const history = useHistory();

  const signOut = () => {
    auth.signOut();
    history.push('/convert');
  }

  return (
    <div className="roundedContainer">
      <small>You are signed in as</small>
      <strong>{props.user.email}</strong>
      <button className="btn" onClick={() => signOut()}>
        Sign out
      </button>
    </div>
  );
};

export default ProfileInfo;
