import { IShape } from "./IShape";

export class Circle implements IShape {
  public size: number;

  constructor (size: number) {
    this.size = size;
  }
}