/**
 * the idea behind this service is to be able to get a different api providers for images (e.g unsplash, shutterstock and others)
 * but wrap them in a single service and expose the same api for all of them,
 * this is an advanced angular implementation i will be happy to elaborate if needed
 */
// ANGULAR
import { Inject, Injectable, Optional } from '@angular/core';

// APP
import { environment } from '../../../environments/environment';

// VENDOR
import Unsplash, { toJson } from 'unsplash-js';

/**
 * list of image provider we support
 */
export const PROVIDER_LIST = {
  UNSPLASH: Unsplash
};

/**
 * create a map between each provider and his configuration
 */
const providersConfig = new Map();
providersConfig.set(PROVIDER_LIST.UNSPLASH, { accessKey: environment.unsplash.accessKey });


@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private api: any;

  /**
   * Each module / component can pass to the service which image provide he wants to use
   * @param imageProvider provider to use
   * @param options as configuration object for the provider
   */
  constructor(
    @Inject('imageProvider') @Optional() public imageProvider?: string,
    @Inject('options') @Optional() public options?: string,
  ) {
    this.imageProvider = this.imageProvider || PROVIDER_LIST.UNSPLASH;
    this.options = this.options || providersConfig.get(this.imageProvider);
    this.api = new (this.imageProvider as any)(this.options);

  }

  public async getList(page: number = 1, perPage: number = 10, orderBy: 'latest' | 'oldest' | 'popular' = 'latest'): Promise<any> {
    return this.api.photos.listPhotos(page, perPage, orderBy).than(toJson);
  }
}
