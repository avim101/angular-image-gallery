import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent {
  title = 'cloudinary';
  imgs = [];

  constructor() {
    // unsplash.photos.listPhotos()
    //   .then(toJson)
    //   .then(json => {
    //     console.log(json);
    //     this.imgs = json;
    //     // unsplash.photos.getPhoto(json[0].id)
    //     //   .then(toJson)
    //     //   .then(yo => {
    //     //     console.log(yo);
    //     //   });
    //   });
  }

}
