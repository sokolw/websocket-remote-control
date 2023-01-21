import { mouse, Region, screen } from '@nut-tree/nut-js';
import { imageToJimp } from '@nut-tree/nut-js/dist/lib/provider/io/imageToJimp.function';

export class ImageCreator {
  public async createScreenshot(): Promise<string> {
    const mousePosition = await mouse.getPosition();
    const size = 200;
    const mainScreenSize = { height: await screen.height(), width: await screen.width() };
    const left = ImageCreator.getBorderOffset(mousePosition.x - size / 2, size, mainScreenSize.width);
    const top = ImageCreator.getBorderOffset(mousePosition.y - size / 2, size, mainScreenSize.height);
    const image = await screen.grabRegion(new Region(left, top, size, size));
    const jimp = imageToJimp(image);
    const base64 = (await jimp.getBase64Async('image/png')).split(',')[1];
    return base64;
  }

  public static getBorderOffset(sideValue: number, size: number, screenLength: number): number {
    if (sideValue < 0) {
      return 0;
    }

    if (sideValue + size > screenLength) {
      return screenLength - size;
    }

    return sideValue;
  }
}
