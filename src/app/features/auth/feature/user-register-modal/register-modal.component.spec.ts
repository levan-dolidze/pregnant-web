import { MockModule } from 'ng-mocks';
import { TranslocoModule } from '@jsverse/transloco';
import { render } from '@testing-library/angular';
import { SharedModule } from '../../../../shared/shared-module/shared';
import { RegisterModalComponent } from './register-modal.component';
import '@testing-library/jest-dom';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { AuthActions } from 'src/app/auth/data-access/state/auth';

const mockDialogRef = {
  close: jest.fn(),
  afterClosed: () => ({
    subscribe: jest.fn()
  })
};

const testProviders = [
  provideMockStore({ initialState: { auth: { authResponse: null, loaded: false, loading: false } } }),
  { provide: MAT_DIALOG_DATA, useValue: {} },
  { provide: MatDialogRef, useValue: mockDialogRef }
];

describe('RegisterModalComponent', () => {
  it('should create', async () => {
    const { container } = await render(RegisterModalComponent, {
      imports: [SharedModule, MockModule(TranslocoModule), MatDialogModule],
      providers: testProviders,
    });
    expect(container).toBeTruthy();
  });

  it('should be invalid when fields are empty', async () => {
    const { fixture } = await render(RegisterModalComponent, {
      imports: [SharedModule, MockModule(TranslocoModule), MatDialogModule],
      providers: testProviders,
    });

    const component = fixture.componentInstance;
    expect(component.registerForm.invalid).toBe(true);
  });

  it('should flag a mismatch error when passwords differ', async () => {
    const { fixture } = await render(RegisterModalComponent, {
      imports: [SharedModule, MockModule(TranslocoModule), MatDialogModule],
      providers: testProviders,
    });

    const component = fixture.componentInstance;
    component.registerForm.patchValue({
      personalNumber: '01010101010',
      mobileNumber: '591880290',
      email: 'test@test.com',
      password: 'password1',
      confirmPassword: 'password2',
    });

    expect(component.f.confirmPassword.errors?.['mismatch']).toBe(true);
    expect(component.registerForm.valid).toBe(false);
  });

  it('should be valid when all fields are correct and passwords match', async () => {
    const { fixture } = await render(RegisterModalComponent, {
      imports: [SharedModule, MockModule(TranslocoModule), MatDialogModule],
      providers: testProviders,
    });

    const component = fixture.componentInstance;
    component.registerForm.patchValue({
      personalNumber: '01010101010',
      mobileNumber: '591880290',
      email: 'test@test.com',
      password: 'password1',
      confirmPassword: 'password1',
    });

    expect(component.registerForm.valid).toBe(true);
  });

  it('should dispatch userRegister when the form is valid', async () => {
    const { fixture } = await render(RegisterModalComponent, {
      imports: [SharedModule, MockModule(TranslocoModule), MatDialogModule],
      providers: testProviders,
    });

    const component = fixture.componentInstance;
    const store = fixture.debugElement.injector.get(Store);
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    const request = {
      personalNumber: '01010101010',
      mobileNumber: '591880290',
      email: 'test@test.com',
      password: 'password1',
      confirmPassword: 'password1',
    };
    component.registerForm.patchValue(request);
    component.onRegister();

    expect(dispatchSpy).toHaveBeenCalledWith(AuthActions.userRegister({ registerRequest: request }));
  });

  it('should not dispatch userRegister when the form is invalid', async () => {
    const { fixture } = await render(RegisterModalComponent, {
      imports: [SharedModule, MockModule(TranslocoModule), MatDialogModule],
      providers: testProviders,
    });

    const component = fixture.componentInstance;
    const store = fixture.debugElement.injector.get(Store);
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    component.onRegister();

    expect(dispatchSpy).not.toHaveBeenCalled();
    expect(component.f.personalNumber.dirty).toBe(true);
  });

  it('should close the dialog on close', async () => {
    const { fixture } = await render(RegisterModalComponent, {
      imports: [SharedModule, MockModule(TranslocoModule), MatDialogModule],
      providers: testProviders,
    });

    const component = fixture.componentInstance;
    component.onClose();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
