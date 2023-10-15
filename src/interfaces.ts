import * as Hapi from '@hapi/hapi';

interface P {
  urls: string[];
}

export type Params = Hapi.Request & { payload: Readonly<P> };
