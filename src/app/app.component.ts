import { Component } from '@angular/core';

import Unsplash, { toJson } from 'unsplash-js';

import { environment } from '../environments/environment';

const unsplash = new Unsplash({ accessKey: environment.unsplash.accessKey });

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent {
  title = 'cloudinary';
  imgs = [];

  constructor() {
    unsplash.photos.listPhotos()
      .then(toJson)
      .then(json => {
        console.log(json);
        this.imgs = json;
        // unsplash.photos.getPhoto(json[0].id)
        //   .then(toJson)
        //   .then(yo => {
        //     console.log(yo);
        //   });
      });
  }

}
