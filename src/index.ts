import { ServerFactory } from './ServerFactory.js';

// run app
const app : ServerFactory = new ServerFactory(5000);
app.start();