// ANGULAR
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

// APP
import { ImageCard } from '../../components/image-card';
import { GallerySandboxService } from './services/gallery.sandbox.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: [ './gallery.component.scss' ],
  encapsulation: ViewEncapsulation.None
})
export class GalleryComponent implements OnInit {
  /**
   * array of images to display
   */
  images: ImageCard[] = [];

  /**
   * selected image for show more details
   */
  selectedImage: any = null;

  visible = false;
  loading = false;

  constructor(private sandbox: GallerySandboxService) {

  }

  async ngOnInit() {
    try {
      this.images = await this.sandbox.getList(1, 100);
    } catch (e) {
      // error handling
    }
  }

  /**
   * an cb for img remove
   * remove the selected img from the array
   * @param image
   */
  public onDelete(image: ImageCard) {
    this.images = this.images.filter(item => item.id !== image.id);
  }

  /**
   * an cb for img show more
   * extract the id of the img and open the show more overlay
   * @param image
   */
  public async onShowMore(image: ImageCard) {
    this.visible = true;
    this.loading = true;
    try {
      this.selectedImage = await this.sandbox.getPhoto(image.id);
    } catch (e) {
      // error
    }
    this.loading = false;
  }

  /**
   * an cb for img edit
   * find the selected img in the array and change the title
   * @param $event
   */
  public onTitleChanged($event) {
    const { image, title } = $event;
    let originalImage = this.images.find(item => item.id === image.id);
    if (originalImage) {
      originalImage.title = title;
    }
  }

  onClose() {
    this.visible = false;
    this.selectedImage = null;
  }
}
