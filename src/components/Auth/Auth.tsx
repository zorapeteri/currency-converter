import React, { useState } from 'react';
import { auth, signInWithGoogle } from '../../firebase';
import style from './Auth.module.scss';

const Auth: React.FunctionComponent = () => {
  const [authType, setAuthType] = useState<'signup' | 'signin'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = {
    signup: () => auth.createUserWithEmailAndPassword(email, password),
    signin: () => auth.signInWithEmailAndPassword(email, password),
  };

  return (
    <div className={`roundedContainer ${style.authContainer}`}>
      <h1>{authType === 'signin' ? 'Sign in' : 'Sign up'}</h1>
      <label htmlFor="email">E-mail address</label>
      <input
        data-testid="email"
        id="email"
        type="email"
        value={email}
        name="email"
        onChange={e => setEmail(e.target.value)}
      />
      <br />
      <label htmlFor="password">Password</label>
      <input
        data-testid="password"
        id="password"
        type="password"
        value={password}
        name="password"
        onChange={e => setPassword(e.target.value)}
      />
      <br />
      <button className="btn" onClick={() => signInWithGoogle()}>
        {authType === 'signin' ? 'Sign in with Google' : 'Sign up with Google'}
      </button>
      <button className="btn" onClick={() => handleSubmit[authType]()}>
        {authType === 'signin' ? 'Sign in' : 'Sign up'}
      </button>
      <br />

      <p>
        {authType === 'signin' ? 'No account?' : 'Have an account?'}
        <button onClick={() => setAuthType(authType === 'signin' ? 'signup' : 'signin')}>
          {authType === 'signup' ? 'Sign in' : 'Sign up'}
        </button>
      </p>
    </div>
  );
};

export default Auth;
