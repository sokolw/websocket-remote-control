import http from 'http';
import { WebSocketServer, ServerOptions } from 'ws';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import { StatusCode } from './StatusCode.js';

export class ServerFactory {
  public readonly portWebsocket: ServerOptions;
  public readonly port: number;
  private mainServer: http.Server | null;
  private webSocketServer: WebSocketServer | null;
  private pathToDirFront: string;

  constructor(port: number) {
    this.portWebsocket = { port: 8080 };
    this.port = port;
    this.pathToDirFront = this.getPathToDirFront();
    this.mainServer = null;
    this.webSocketServer = null;
  }

  public start(): void {
    this.initDispose();
    console.log(this.pathToDirFront)
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
      ws.on('message', data => {
        ws.send(data.toString());
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