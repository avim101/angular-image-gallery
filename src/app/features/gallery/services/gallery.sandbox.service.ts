// ANGULAR
import { Injectable } from '@angular/core';
import { GalleryService } from './gallery.service';
import { ImageCard } from '../../../components/image-card';

@Injectable({
  providedIn: 'root'
})
export class GallerySandboxService {

  constructor(private galleryService: GalleryService) {
  }

  /**
   * get a pager options and return img card object
   * @param page
   * @param perPage
   * @param orderBy
   */
  public getList(page: number = 1, perPage: number = 10, orderBy: 'latest' | 'oldest' | 'popular' = 'latest'): Promise<ImageCard[]> {
    return this.galleryService.getList(page, perPage, orderBy)
      .then(res => res.map((img) => {
        return {
          id: img.id,
          title: img.description || 'Add a title',
          src: `https://source.unsplash.com/${img.id}/290x250`,
          pixelSrc: `https://source.unsplash.com/${ img.id }/5x5`,
          alt: img.alt_description
        };
      }));
  }

  /**
   * get a specific photo by id
   * @param id
   */
  public getPhoto(id: string){
    return this.galleryService.getPhoto(id);
  }

}
