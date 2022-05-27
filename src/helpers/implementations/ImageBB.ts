import {IImageHelper} from "../IImageHelper";
import {Image} from "../../entities/Image";
import axios from "axios"
import FormData from "form-data"

export class ImageBB implements IImageHelper {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async upload(image: string): Promise<Image> {
    try {
      const form = new FormData()
      form.append("image", image)
      const response = await axios.post(`https://api.imgbb.com/1/upload?key=${this.apiKey}`, form);
      const {data: {image: {url, extension}, thumb, medium, delete_url}} = response.data
      return new Image(url, thumb.url, medium.url, delete_url, extension);
    } catch (e) {
      throw {code: "s", message: "error"}
    }
  }
}
