import firebase from 'firebase';
import fbConfig from '../.env.json';

// Initialize Firebase
// --- const config = {
// ---   apiKey: 'AIzaSyDUIXvlkSsNxKrLcOjRaR04AIOJ5H-QxKI',
// ---   authDomain: 'newshunter-136e1.firebaseapp.com',
// ---   databaseURL: 'https://newshunter-136e1.firebaseio.com',
// ---   projectId: 'newshunter-136e1',
// ---   storageBucket: '',
// ---   messagingSenderId: '794405014926',
// --- };

const config = {
  apiKey: fbConfig.apiKey,
  authDomain: fbConfig.authDomain,
  databaseURL: fbConfig.databaseURL,
  projectId: fbConfig.projectId,
  storageBucket: '',
  messagingSenderId: fbConfig.messagingSenderId,
};

firebase.initializeApp(config);

export default {
  database: firebase.database(),
};
