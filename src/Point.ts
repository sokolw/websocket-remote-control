export class Point {
  constructor(public readonly x: number, public readonly y: number) {}

  toString() {
    return `(${this.x}, ${this.y})`;
  }
}
