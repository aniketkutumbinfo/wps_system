import { TestBed } from '@angular/core/testing';

import { PersonalRelationshipService } from './personal-relationship.service';

describe('PersonalRelationshipService', () => {
  let service: PersonalRelationshipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalRelationshipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
