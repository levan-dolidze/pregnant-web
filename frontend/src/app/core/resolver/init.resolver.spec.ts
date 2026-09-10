import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { initResolver } from './init.resolver';

describe('initResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => initResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
