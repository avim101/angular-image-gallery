// ANGULAR
import { Component, OnInit } from '@angular/core';

// APP
import { ImageCard } from '../../components/image-card';
import { GallerySandboxService } from './services/gallery.sandbox.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: [ './gallery.component.scss' ]
})
export class GalleryComponent implements OnInit {
  images: ImageCard[] = [];

  constructor(private sandbox: GallerySandboxService) {

  }

  async ngOnInit() {
    try {
      this.images = await this.sandbox.getList(1, 100);
    } catch (e) {
      // error handling
    }
  }

  public onDelete(image: ImageCard) {
    this.images = this.images.filter(item => item.id !== image.id);
  }

  public onShowMore(image: ImageCard) {

  }

  public onTitleChanged($event) {
    const { image, title } = $event;
    let originalImage = this.images.find(item => item.id === image.id);
    if (originalImage) {
      originalImage.title = title;
    }
  }
}
