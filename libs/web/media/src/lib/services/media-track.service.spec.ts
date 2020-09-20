import { TestBed } from '@angular/core/testing';

import { MediaTrackService } from './media-track.service';

describe('MediaTrackService', () => {
  let service: MediaTrackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediaTrackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
