// ANGULAR
import { Injectable } from '@angular/core';
import { ImageService } from '../../../share/services/image.service';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(private imgApi: ImageService) {
  }

  public getList(page: number = 1, perPage: number = 10, orderBy: 'latest' | 'oldest' | 'popular' = 'latest'): Promise<any> {
    return this.imgApi.getList(page, perPage, orderBy);
  }

  // public getPhoto(id): Promise<any> {
  //   return this.imgApi.
  // }
}
