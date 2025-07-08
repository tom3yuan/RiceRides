import 'dotenv/config';

export default {
  expo: {
    name: 'MyApp',
    slug: 'my-app',
    owner: 'ricerides',
    extra: {
      googleWebClientId: process.env.GOOGLE_WEB_CLIENT_ID,
      eas: {
        projectId: "f740dd84-5239-4d7a-b949-4a75112f7a81"
      }
    },
  },
};