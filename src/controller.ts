import * as Hapi from '@hapi/hapi';
import Boom from '@hapi/boom';
import { Params } from './interfaces';
import { PDF, htmlText } from './helpers';

class Controller {
  async hello(request: Params, h: Hapi.ResponseToolkit) {
    try {
      const urls = request.payload.urls;
      let ans: string[][] = [];
      let i = 0;

      for (let url of urls) {
        const axios = require('axios').default;
        const html = await axios.get(url);
        ans.push([url].concat(htmlText(html.data, i)));
        ++i;
      }

      const document = PDF(ans);

      return h
        .response(document)
        .type('application/pdf')
        .header('Connection', 'keep-alive')
        .header('Cache-Control', 'no-cache')
        .header('Content-Disposition', 'attachment;filename=myfilename.pdf');
    } catch (error) {
      console.error(error);
      return Boom.badImplementation('error');
    }
  }
}

export default new Controller();
