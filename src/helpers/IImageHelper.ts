import {Image} from "../entities/Image";

export interface IImageHelper {
  upload(file: string): Promise<Image>;
}

