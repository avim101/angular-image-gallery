// ANGULAR
import { Injectable } from '@angular/core';
import { ImageService } from '../../../share/services/image.service';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(private imgApi: ImageService) {
  }

  /**
   * get a pager options and return list of photos from the imgApi
   * @param page
   * @param perPage
   * @param orderBy
   */
  public getList(page: number = 1, perPage: number = 10, orderBy: 'latest' | 'oldest' | 'popular' = 'latest'): Promise<any> {
    return this.imgApi.getList(page, perPage, orderBy);
  }

  /**
   * get a specific photo by id
   * @param id
   */
  public getPhoto(id: string): Promise<any> {
    return this.imgApi.getPhoto(id)
  }
}
