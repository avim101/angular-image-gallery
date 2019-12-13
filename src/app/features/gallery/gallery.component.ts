// ANGULAR
import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../share/services/image.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: [ './gallery.component.scss' ]
})
export class GalleryComponent implements OnInit {

  constructor(private img: ImageService) {
    console.log(this.img);
  }

  ngOnInit() {
  }

}
