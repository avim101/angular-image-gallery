// ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// APP
import { GalleryComponent } from './gallery.component';
import { GalleryRoutingModule } from './gallery-routing.module';
import { ImageService, PROVIDER_LIST } from '../../share/services/image.service';


@NgModule({
  declarations: [ GalleryComponent ],
  imports: [
    CommonModule,
    GalleryRoutingModule
  ],
  providers: [
    ImageService,
    {
      provide: 'imageProvider',
      useValue: PROVIDER_LIST.UNSPLASH
    },
  ]
})
export class GalleryModule {
}
