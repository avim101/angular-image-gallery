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
  imgList: ImageCard[] = [];

  /**
   * selected image for show more details
   */
  selectedImg: any = null;

  /**
   * show / hide img overlay
   */
  visible = false;

  /**
   * loader when getting selected img details
   */
  loadingImg = false;

  /**
   * loader when getting the lis of img
   */
  listLoading = true;

  constructor(private sandbox: GallerySandboxService) {

  }

  async ngOnInit() {
    try {
      this.imgList = await this.sandbox.getList(1, 100);
    } catch (e) {
      // error handling
    }
    this.listLoading = false;
  }

  /**
   * an cb for img remove
   * remove the selected img from the array
   * @param image
   */
  public onDelete(image: ImageCard) {
    this.imgList = this.imgList.filter(item => item.id !== image.id);
  }

  /**
   * an cb for img show more
   * extract the id of the img and open the show more overlay
   * @param image
   */
  public async onShowMore(image: ImageCard) {
    this.visible = true;
    this.loadingImg = true;
    try {
      this.selectedImg = await this.sandbox.getPhoto(image.id);
    } catch (e) {
      // error
    }
    this.loadingImg = false;
  }

  /**
   * an cb for img edit
   * find the selected img in the array and change the title
   * @param $event
   */
  public onTitleChanged($event) {
    const { img, title } = $event;
    let originalImage = this.imgList.find(item => item.id === img.id);
    if (originalImage) {
      originalImage.title = title;
    }
  }

  /**
   * a cb for the overlay close event
   * close overlay and init selected image
   */
  onClose() {
    this.visible = false;
    this.selectedImg = null;
  }
}
