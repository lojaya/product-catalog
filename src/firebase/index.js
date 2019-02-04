import firebase from '@firebase/app';
import '@firebase/firestore';

const config = {
  apiKey: 'AIzaSyDeCXwbGEfs_GsdmSXR77z4wO0ZFllMk3s',
  projectId: 'pulp-fiction-7effc',
};

firebase.initializeApp(config);

export default firebase;

export const firestore = firebase.firestore();