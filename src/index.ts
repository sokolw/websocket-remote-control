import { ServerFactory } from './ServerFactory';
import 'dotenv/config';

const checkEnv = (): void => {
  if (!process.env.PORT) {
    console.log('PORT in file .env is not set!');
    process.exit(1);
  }
};

checkEnv();

// run app
const app : ServerFactory = new ServerFactory(parseInt(process.env.PORT as string, 10));
app.start();