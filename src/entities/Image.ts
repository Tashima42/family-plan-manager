export class Image {
  private fullUrl: string
  private thumbUrl: string
  private mediumUrl: string
  private deleteUrl: string
  private extension: string
  constructor(fullUrl: string, thumbUrl: string, mediumUrl: string, deleteUrl: string, extension: string) {
    this.fullUrl = fullUrl
    this.thumbUrl = thumbUrl
    this.mediumUrl = mediumUrl
    this.deleteUrl = deleteUrl
    this.extension = extension
  }

  getFullUrl(): string {
    return this.fullUrl
  }
  getThumbnailUrl(): string {
    return this.thumbUrl
  }
  getMediumUrl(): string {
    return this.mediumUrl
  }
  getDeleteUrl(): string {
    return this.deleteUrl
  }
  getExtension(): string {
    return this.extension
  }
}
