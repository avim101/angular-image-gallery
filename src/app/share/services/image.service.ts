/**
 * The idea behind this service is to be able to get a different api providers for images (e.g unsplash, shutterstock and others)
 * but wrap them in a single service and expose the same api for all of them,
 * I will be happy to elaborate if needed
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
providersConfig.set(PROVIDER_LIST.UNSPLASH, { accessKey: environment.unsplash.accessKey, secret: environment.unsplash.secretKey });


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
    @Inject('imageProvider') @Optional() public imageProvider?: any,
    @Inject('options') @Optional() public options?: any,
  ) {
    this.imageProvider = imageProvider || PROVIDER_LIST.UNSPLASH;
    this.options = options || providersConfig.get(this.imageProvider);
    this.api = new this.imageProvider(this.options);

  }

  /**
   * get a pager options and return list of photos from img provider api
   * @param page
   * @param perPage
   * @param orderBy
   */
  public getList(page: number = 1, perPage: number = 10, orderBy: 'latest' | 'oldest' | 'popular' = 'latest'): Promise<any> {
    return this.api.photos.listPhotos(page, perPage, orderBy).then(toJson);
  }

  /**
   * get a specific photo by id
   * @param id
   */
  public getPhoto(id: string): Promise<any> {
    return this.api.photos.getPhoto(id).then(toJson);
  }

}
