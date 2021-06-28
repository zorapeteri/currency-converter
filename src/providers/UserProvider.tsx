import React, { useState, createContext, useEffect } from 'react';
import { auth, firestore, createUserProfileDocument } from '../firebase';

type UserContextType = {
  user: null | User;
  isLoading: boolean;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: true,
});

const collectIdsAndDocs = (doc: any) => {
  if (doc.id) {
    return { id: doc.id, ...doc.data() };
  }

  if (doc.uid) {
    return { uid: doc.uid, ...doc.data() };
  }

  return doc;
};

const UserProvider: React.FunctionComponent<{ children: any }> = (props: { children: any }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  let unsubscribeFromAuth: () => void;
  let unsubscribeFromFirestore: () => void;

  useEffect(() => {
    unsubscribeFromAuth = auth.onAuthStateChanged(async authUser => {
      if (authUser) {
        const userRef = await createUserProfileDocument(authUser);

        if (userRef) {
          let id = (await userRef.get()).id;

          unsubscribeFromFirestore = firestore
            .collection('users')
            .doc(id)
            .onSnapshot(snapshot => {
              const user = collectIdsAndDocs(snapshot);
              setUser(user);
              setLoading(false);
            });

          userRef.onSnapshot(snapshot => {
            firestore
              .collection('users')
              .doc(snapshot.id)
              .update({ ...snapshot.data() });
          });
        }
      } else {
        if (unsubscribeFromFirestore) unsubscribeFromFirestore();
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeFromAuth();
      if (unsubscribeFromFirestore) {
        unsubscribeFromFirestore();
      }
    };
  }, []);

  return <UserContext.Provider value={{ user, isLoading }}>{props.children}</UserContext.Provider>;
};

export default UserProvider;
