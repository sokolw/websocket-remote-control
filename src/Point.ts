export class Point {
  constructor(public x: number, public y: number) {}

  changePosByPlatform() {
    switch (process.platform) {
      case 'win32':
        this.x += 1;
        this.y += 1;
        return this;
      case 'linux':
        return this;
      case 'darwin':
        return this;
      default:
        return this;
    }
  }

  toString() {
    return `(${this.x}, ${this.y})`;
  }
}
