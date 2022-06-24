import { IShape } from "./IShape.js";

export class Square implements IShape {
  public size: number;

  constructor (size: number) {
    this.size = size;
  }
}