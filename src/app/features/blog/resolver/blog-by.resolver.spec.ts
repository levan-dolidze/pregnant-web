import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { blogByResolver } from './blog-by.resolver';

describe('blogByResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => blogByResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
