// ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// VENDORS
import {
  NgZorroAntdModule,
  NZ_ICONS
} from 'ng-zorro-antd';
import { DeleteOutline, EditOutline, MoreOutline } from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { LazyLoadImageModule } from 'ng-lazyload-image';

// APP
import { GalleryComponent } from './gallery.component';
import { GalleryRoutingModule } from './gallery-routing.module';
import { ImageCardComponent } from '../../components/image-card';


const icons: IconDefinition[] = [ DeleteOutline, EditOutline, MoreOutline ];

@NgModule({
  declarations: [
    GalleryComponent,
    ImageCardComponent
  ],
  imports: [
    CommonModule,
    GalleryRoutingModule,
    LazyLoadImageModule,
    ReactiveFormsModule,
    NgZorroAntdModule
  ],
  providers: [
    {
      provide: NZ_ICONS, useValue: icons
    }
  ]
})
export class GalleryModule {
}
