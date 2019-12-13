// Angular
import { TestBed } from '@angular/core/testing';

// APP
import { GallerySandboxService } from './gallery.sandbox.service';

describe('GallerySandboxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GallerySandboxService = TestBed.get(GallerySandboxService);
    expect(service).toBeTruthy();
  });
});
