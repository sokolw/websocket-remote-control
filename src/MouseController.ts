import { Point } from "./Point";
import { Circle } from './Circle';
import { Rectangle } from "./Rectangle";
import { Square } from "./Square";
import robot from 'robotjs';

export class MouseController {

  public async mouseUp(point: Point): Promise<void> {
    const mousePoint: Point = robot.getMousePos();
    robot.moveMouse(mousePoint.x, mousePoint.y - point.y);
  }

  public async mouseDown(point: Point): Promise<void> {
    const mousePoint: Point = robot.getMousePos();
    robot.moveMouse(mousePoint.x, mousePoint.y + point.y);
  }

  public async mouseLeft(point: Point): Promise<void> {
    const mousePoint: Point = robot.getMousePos();
    robot.moveMouse(mousePoint.x - point.x, mousePoint.y);
  }

  public async mouseRight(point: Point): Promise<void> {
    const mousePoint: Point = robot.getMousePos();
    robot.moveMouse(mousePoint.x + point.x, mousePoint.y);
  }
  
  public async mousePosition(): Promise<Point> {
    const mousePoint: Point = robot.getMousePos();
    return new Point(mousePoint.x, mousePoint.y);
  }

  public async drawCircle(figure: Circle): Promise<void> {
    const mousePoint: Point = robot.getMousePos();

    for (let i = 0; i <= Math.PI * 2; i += 0.04) {
      const x = mousePoint.x + ((figure.size / 2) * Math.cos(i));
      const y = mousePoint.y + ((figure.size / 2) * Math.sin(i));
      robot.moveMouse(x, y);
      if(i === 0) {
        robot.mouseToggle("down");
      }
    }
    robot.mouseToggle("up");
  }

  public async drawRectangle(figure: Rectangle): Promise<void> {
    const mousePoint: Point = robot.getMousePos();
    const speed: number = 4;

    for (let i = 0; i <= figure.width; i += speed) {
      robot.moveMouse(mousePoint.x + i, mousePoint.y);
      if(i === 0) {
        robot.mouseToggle("down");
      }
    }
    for (let i = 0; i <= figure.height; i += speed) 
      robot.moveMouse(mousePoint.x + figure.width, mousePoint.y + i);
    for (let i = mousePoint.x + figure.width; i >= mousePoint.x; i -= speed)
      robot.moveMouse(i, mousePoint.y + figure.height);
    for (let i = mousePoint.y + figure.height; i >= mousePoint.y; i -= speed)
      robot.moveMouse(mousePoint.x, i);

    robot.mouseToggle("up");
  }

  public async drawSquare(figure: Square): Promise<void> {
    const mousePoint: Point = robot.getMousePos();
    const speed: number = 4;

    for (let i = 0; i <= figure.size; i += speed) {
      robot.moveMouse(mousePoint.x + i, mousePoint.y);
      if(i === 0) {
        robot.mouseToggle("down");
      }
    }
    for (let i = 0; i <= figure.size; i += speed) 
      robot.moveMouse(mousePoint.x + figure.size, mousePoint.y + i);
    for (let i = mousePoint.x + figure.size; i >= mousePoint.x; i -= speed)
      robot.moveMouse(i, mousePoint.y + figure.size);
    for (let i = mousePoint.y + figure.size; i >= mousePoint.y; i -= speed)
      robot.moveMouse(mousePoint.x, i);

    robot.mouseToggle("up");
  }
}