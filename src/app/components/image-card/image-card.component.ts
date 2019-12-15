// ANGULAR
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// APP
import { ImageCard } from './image-card.model';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: [ './image-card.component.scss' ]
})
export class ImageCardComponent implements OnInit {
  /**
   * a form to hold component inputs
   */
  public titleForm: FormGroup;

  /**
   * a variable to show / hide popover
   */
  public showPopover = false;

  /**
   * img title
   */
  @Input() public img: ImageCard;

  /**
   * fire event when title changed
   */
  @Output() public titleChanged = new EventEmitter<{ img: ImageCard, title: string }>();

  /**
   * fire event when image is deleted
   */
  @Output() public deleted = new EventEmitter<ImageCard>();

  /**
   * fire event when details icon clicked
   */
  @Output() public showMore = new EventEmitter<ImageCard>();


  constructor(private formBuilder: FormBuilder) {
  }

  /**
   * angular init hook
   */
  ngOnInit() {
    this.titleForm = this.formBuilder.group({
      title: [ this.img.title, Validators.required ],
    });
  }

  /**
   * emit the deleted img when delete icon is clicked
   * @param img
   */
  public onDeleted(img: ImageCard) {
    this.deleted.emit(img);
  }

  /**
   * emit the deleted img when show more icon is clicked
   * @param img
   */
  public onShowMore(img: ImageCard) {
    this.showMore.emit(img);
  }

  /**
   * emit the editable img with the text to replace the title
   * emit only if the form is valid
   * @param img
   */
  public submitForm(img: ImageCard) {
    if (this.titleForm.valid) {
      this.showPopover = false;
      // fire title changed with the new value
      this.titleChanged.emit({ img, title: this.titleForm.controls['title'].value });
    }
  }
}
