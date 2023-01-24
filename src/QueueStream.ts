import stream from "stream";

export class QueueStream extends stream.Duplex {
  data: any = [];

  _write(chunk: any, enc: BufferEncoding, next: (error?: Error | null) => void): void {
    this.data.push(chunk);
    next();
  }

  _read(size: number): void {
    this.push(this.data.shift());
  }
}