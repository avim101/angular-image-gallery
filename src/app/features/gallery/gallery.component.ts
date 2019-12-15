// ANGULAR
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

// APP
import { ImageCard } from '../../components/image-card';
import { GallerySandboxService } from './services/gallery.sandbox.service';

const ITEMS_PER_PAGE = 12;

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
  public imgList: ImageCard[] = [];

  /**
   * selected image for show more details
   */
  public selectedImg: any = null;

  /**
   * show / hide img overlay
   */
  public visible = false;

  /**
   * loader when getting selected img details
   */
  public loadingImg = false;

  /**
   * loader when getting the lis of img
   */
  public listLoading = true;

  /**
   * infinite scroll loader
   */
  public loadMoreSpinner = false;

  private pageNumber = 1;

  constructor(private sandbox: GallerySandboxService) {

  }

  async ngOnInit() {
    try {
      this.imgList = await this.sandbox.getList(this.pageNumber, ITEMS_PER_PAGE);
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
  public onClose() {
    this.visible = false;
    this.selectedImg = null;
  }

  /**
   * load more images when scroll is getting to the distance
   */
  public async loadMore() {
    let imgs = [];
    this.loadMoreSpinner = true;
    try {
      imgs = await this.sandbox.getList(++this.pageNumber, ITEMS_PER_PAGE);
      this.imgList = this.imgList.concat(imgs);
    } catch (e) {
      // error
    }
    this.loadMoreSpinner = false;
  }
}
