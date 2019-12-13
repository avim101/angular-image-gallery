// ANGULAR
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// APP
import { GalleryComponent } from './gallery.component';

const routes: Routes = [
  {
    path: '',
    component: GalleryComponent
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class GalleryRoutingModule {
}
