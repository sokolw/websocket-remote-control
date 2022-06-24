import { ServerFactory } from './ServerFactory.js';
import { config } from "dotenv";

const setEnv = () : void => {
  config();
  if (!process.env.PORT) {
    process.exit(1);
  }
}
setEnv();

// run app
const app : ServerFactory = new ServerFactory(parseInt(process.env.PORT as string, 10));
app.start();