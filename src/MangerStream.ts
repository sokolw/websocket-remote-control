import stream from "stream";
import { RemoteCommands } from "./RemoteCommands.js";
import { Point } from "./Point.js";
import { ServerFactory } from './ServerFactory.js';
import { IShape } from "./IShape.js";
import { Circle } from "./Circle.js";
import { Rectangle } from "./Rectangle.js";
import { Square } from "./Square.js";
import { MouseController } from "./MouseController.js";
import { ImageCreator } from "./ImageCreator.js";

export class MangerStream extends stream.Duplex {
  data: any = [];
  private server: ServerFactory;
  private mapCommands: Map<string, any>;
  private mouseController: MouseController;
  private imageCreator: ImageCreator
  
  constructor(server: ServerFactory) {
    super();
    this.server = server;
    this.mouseController = new MouseController();
    this.imageCreator = new ImageCreator();
    this.mapCommands = new Map<string, any>([
      [RemoteCommands.MouseUp, this.mouseController.mouseUp],
      [RemoteCommands.MouseDown, this.mouseController.mouseDown],
      [RemoteCommands.MouseLeft, this.mouseController.mouseLeft],
      [RemoteCommands.MouseRight, this.mouseController.mouseRight],
      [RemoteCommands.MousePosition, this.mouseController.mousePosition],
      [RemoteCommands.DrawCircle, this.mouseController.drawCircle],
      [RemoteCommands.DrawRectangle, this.mouseController.drawRectangle],
      [RemoteCommands.DrawSquare, this.mouseController.drawSquare],
      [RemoteCommands.PrintScrn, this.imageCreator.createScreenshot],
    ]);
  }

  async _write(chunk: any, enc: BufferEncoding, next: (error?: Error | null) => void): Promise<void> {
    if (chunk !== null && chunk !== undefined) {
      const parsedData = this.parseData(chunk.toString());
      if (parsedData !== null) {
        const executionResult: Point | undefined | string = await this.mapCommands.get(parsedData.command)(parsedData.value);
        console.log(parsedData, 'manager write ', executionResult);
        if (executionResult instanceof Point) {
          this.data.push(`${RemoteCommands.MousePosition} ${executionResult.x},${executionResult.y}`);
        } else if (typeof executionResult === 'string') {
          this.data.push(`${RemoteCommands.PrintScrn} ${executionResult}`);
        } else {
          this.data.push(parsedData.command);
        }

        if (this.data !== 0) {
          this.server.emit('dataIsReady');
        }
      }
    }
    next();
  }

  _read(size: number): void {
    this.push(this.data.shift());
  }

  

  private parseData (command: string) : { command: string; value: Point | IShape | void } | null {
    const space: string = ' ';
    const arr: string[] = command.split(space);
    if (arr.length > 0 && arr.length < 4) {
      if (this.mapCommands.has(arr[0])) {
        switch (arr[0]) {
          case RemoteCommands.MouseUp:
            return { command: arr[0], value: new Point(0,  parseInt(arr[1], 10))};
          case RemoteCommands.MouseDown:
            return { command: arr[0], value: new Point(0,  parseInt(arr[1], 10))};
          case RemoteCommands.MouseLeft:
            return { command: arr[0], value: new Point(parseInt(arr[1], 10), 0)};
          case RemoteCommands.MouseRight:
            return { command: arr[0], value: new Point(parseInt(arr[1], 10), 0)};
          case RemoteCommands.DrawCircle:
            return { command: arr[0], value: new Circle(parseInt(arr[1], 10))};
          case RemoteCommands.DrawRectangle:
            return { command: arr[0], value: new Rectangle(parseInt(arr[1], 10), parseInt(arr[2], 10))};
          case RemoteCommands.DrawSquare:
            return { command: arr[0], value: new Square(parseInt(arr[1], 10))};
          case RemoteCommands.MousePosition:
          case RemoteCommands.PrintScrn:
            return { command: arr[0], value: undefined };
        }
      }
    }
    return null; 
  }
}