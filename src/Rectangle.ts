import { IShape } from "./IShape.js";

export class Rectangle implements IShape{
  public size?: number;
  
  public width: number;
  public height: number;

  constructor (width: number, height: number) {
    this.width = width;
    this.height = height;
  }
}