import http from 'http';
import ws, { WebSocketServer, ServerOptions, createWebSocketStream } from 'ws';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import { StatusCode } from './StatusCode.js';
import { QueueStream } from './QueueStream.js';
import stream from 'stream';
import EventEmitter from 'events';
import { MangerStream } from './MangerStream.js';

export class ServerFactory extends EventEmitter{
  public readonly portWebsocket: ServerOptions;
  public readonly port: number;
  private mainServer: http.Server | null;
  private webSocketServer: WebSocketServer | null;
  private pathToDirFront: string;
  private queue: stream.Duplex;
  private manager: stream.Duplex;

  constructor(port: number) {
    super()
    this.portWebsocket = { port: 8080 };
    this.port = port;
    this.pathToDirFront = this.getPathToDirFront();
    this.mainServer = null;
    this.webSocketServer = null;
    this.queue = new QueueStream();
    this.manager = new MangerStream(this);
  }

  public start(): void {
    this.initDispose();
    this.startMainServer();
    this.startWebSocketServer();
  }

  private startMainServer(): void {
    this.mainServer = http.createServer((request, response) => {
      if (request !== undefined && request.url !== undefined) {
        const urlPath: string = request.url === '/' ? '/front/index.html' : '/front' + request.url;
        const pathToFile: string = path.join(this.pathToDirFront, urlPath);
        fs.readFile(pathToFile, (err, data) => {
          if (err) {
            response.writeHead(StatusCode.NotFound);
            response.end(JSON.stringify(err));
            return;
          }
          response.writeHead(StatusCode.Ok);
          response.end(data);
        });
      } else {
        response.writeHead(StatusCode.NotFound);
        response.end();
      }
    });

    this.mainServer.listen(this.port, () => {
      console.log(`Start static http server on the ${this.port} port!`);
    });
  }

  private startWebSocketServer() {
    this.webSocketServer = new WebSocketServer(this.portWebsocket);
    this.webSocketServer.on('connection', ws => {
      console.log('Connection successful!');
      const stream: stream.Duplex = createWebSocketStream(ws, { encoding : 'utf-8', decodeStrings: false});
      stream.on('data', data => {
        if (data !== null){
          this.queue.write(data.toString());
        }
        const temp = this.queue.read();
        if (temp !== null) {
          this.manager.write(temp);
        }
      });

      const dataIsReadyHandler = () => {
        const readyData = this.manager.read();
        if (readyData !== null){
          stream.write(readyData.toString());
        }
      };

      this.on('dataIsReady', dataIsReadyHandler);

      ws.once('close',() => {
        console.log('Connection is close!');
        this.removeListener('dataIsReady', dataIsReadyHandler);
        if(!stream.destroyed){
          stream.destroy();
          console.log('WSStream destroyed!')
        }
      });
    });
  }

  private getPathToDirFront(): string {
    const pathToCurrentFile: string = fileURLToPath(import.meta.url);
    const pathToCurrentDir: string = dirname(pathToCurrentFile);
    return path.join(pathToCurrentDir, '..');
  }

  private initDispose(): void {
    process.on('SIGINT', () => {
      if (this.webSocketServer !== null) {
        this.webSocketServer.close();
      }

      if (this.mainServer !== null) {
        this.mainServer.close();
      }
      
      process.exit();
    });
  }
}