import { Circle } from './Circle';
import { Rectangle } from './Rectangle';
import { Square } from './Square';
import { Button, mouse } from '@nut-tree/nut-js';
import { Point } from './Point';

export class MouseController {
  public async mouseUp(point: Point): Promise<void> {
    const mousePosition = await mouse.getPosition();
    await mouse.setPosition(new Point(mousePosition.x + 1, mousePosition.y - point.y + 1));
  }

  public async mouseDown(point: Point): Promise<void> {
    const mousePosition = await mouse.getPosition();
    await mouse.setPosition(new Point(mousePosition.x + 1, mousePosition.y + point.y + 1));
  }

  public async mouseLeft(point: Point): Promise<void> {
    const mousePosition = await mouse.getPosition();
    await mouse.setPosition(new Point(mousePosition.x - point.x + 1, mousePosition.y + 1));
  }

  public async mouseRight(point: Point): Promise<void> {
    const mousePosition = await mouse.getPosition();
    await mouse.setPosition(new Point(mousePosition.x + point.x + 1, mousePosition.y + 1));
  }

  public async mousePosition(): Promise<Point> {
    const mousePosition = await mouse.getPosition();
    return new Point(mousePosition.x, mousePosition.y);
  }

  public async drawCircle(figure: Circle): Promise<void> {
    const mousePosition = await mouse.getPosition();
    for (let i = 0; i <= Math.PI * 2; i += 0.0025) {
      const x = mousePosition.x + (figure.size / 2) * Math.cos(i);
      const y = mousePosition.y + (figure.size / 2) * Math.sin(i);
      await mouse.setPosition(new Point(x + 1, y + 1));
      if (i === 0) {
        await mouse.pressButton(Button.LEFT);
      }
    }
    await mouse.releaseButton(Button.LEFT);
  }

  public async drawRectangle(figure: Rectangle): Promise<void> {
    const mousePosition = await mouse.getPosition();
    const speed = 0.05;
    for (let i = 0; i <= figure.width; i += speed) {
      await mouse.setPosition(new Point(mousePosition.x + i + 1, mousePosition.y + 1));
      if (i === 0) {
        await mouse.pressButton(Button.LEFT);
      }
    }
    for (let i = 0; i <= figure.height; i += speed)
      await mouse.setPosition(new Point(mousePosition.x + figure.width + 1, mousePosition.y + i + 1));
    for (let i = mousePosition.x + figure.width; i >= mousePosition.x; i -= speed)
      await mouse.setPosition(new Point(i + 1, mousePosition.y + figure.height + 1));
    for (let i = mousePosition.y + figure.height; i >= mousePosition.y; i -= speed)
      await mouse.setPosition(new Point(mousePosition.x + 1, i + 1));

    await mouse.releaseButton(Button.LEFT);
  }

  public async drawSquare(figure: Square): Promise<void> {
    const mousePosition = await mouse.getPosition();
    const speed = 0.05;
    for (let i = 0; i <= figure.size; i += speed) {
      await mouse.setPosition(new Point(mousePosition.x + i + 1, mousePosition.y + 1));
      if (i === 0) {
        await mouse.pressButton(Button.LEFT);
      }
    }
    for (let i = 0; i <= figure.size; i += speed)
      await mouse.setPosition(new Point(mousePosition.x + figure.size + 1, mousePosition.y + i + 1));
    for (let i = mousePosition.x + figure.size; i >= mousePosition.x; i -= speed)
      await mouse.setPosition(new Point(i + 1, mousePosition.y + figure.size + 1));
    for (let i = mousePosition.y + figure.size; i >= mousePosition.y; i -= speed)
      await mouse.setPosition(new Point(mousePosition.x + 1, i + 1));

    await mouse.releaseButton(Button.LEFT);
  }
}
