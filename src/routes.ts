import Hapi from '@hapi/hapi';
import Controller from './controller';

const Routes: Hapi.ServerRoute[] = [
  {
    path: '/api/urls',
    method: 'POST',
    options: {
      auth: false,
      handler: Controller.hello,
    },
  },
];

export default Routes;
