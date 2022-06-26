import Jimp from 'jimp';
import robot from 'robotjs';
import { Point } from './Point';

export class ImageCreator {
  public async createScreenshot(): Promise<string> {
    const mousePoint: Point = robot.getMousePos();
    const size: number = 200;
    const image: robot.Bitmap = robot.screen.capture(
      mousePoint.x - size / 2,
      mousePoint.y - size / 2,
      size, size
    );

    for(let i = 0; i < image.image.length; i++) {
      if (i % 4 === 0) {
        const temp = image.image[i];
        image.image[i] = image.image[i + 2];
        image.image[i + 2] = temp;
      }
    }

    const jimp = new Jimp({ data: image.image, width: size, height: size });
    const base64 = (await jimp.getBase64Async(Jimp.MIME_PNG)).split(',')[1];

    return base64;
  }
}