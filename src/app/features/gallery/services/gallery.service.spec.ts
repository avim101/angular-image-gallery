// ANGULAR
import { TestBed } from '@angular/core/testing';

// APP
import { GalleryService } from './gallery.service';

describe('GalleryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GalleryService = TestBed.get(GalleryService);
    expect(service).toBeTruthy();
  });
});
