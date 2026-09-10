import { MockModule } from 'ng-mocks';
import { TranslocoModule } from '@jsverse/transloco';
import { render      } from '@testing-library/angular';
import { SharedModule } from '../../shared/shared-module/shared';
import { AsyncDialogModel, ConfirmDialogModel, ConfirmDialogStandartComponent } from './confirm-dialog-standart.component';
import '@testing-library/jest-dom';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

export const mockDialogModel: ConfirmDialogModel = {
    message: 'How are you?',
    isOpen: true,
    result: 'init',
    confirmBtn: 'Confirm',
    rejectBtn: 'Cancel',
    actionType: 'init',
    params: new AsyncDialogModel(),
};

const mockDialogRef = {
    close: jest.fn(),
    afterClosed: () => ({
        subscribe: jest.fn()
    })
};

describe('ConfirmDialogStandartComponent', () => {
    it('should create', async () => {
        const { container } = await render(ConfirmDialogStandartComponent, {
            imports: [SharedModule, MockModule(TranslocoModule), MatDialogModule],
            providers: [
                { provide: MAT_DIALOG_DATA, useValue: { dialogModel: mockDialogModel } },
                { provide: MatDialogRef, useValue: mockDialogRef }
            ],
        });
        expect(container).toBeTruthy();
    });

    it('should render dialog with mock data', async () => {
        const mockData = {
            dialogModel: {
                ...mockDialogModel,
                question: 'How are you?'
            }
        };

        const { fixture } = await render(ConfirmDialogStandartComponent, {
            imports: [SharedModule, MockModule(TranslocoModule), MatDialogModule],
            providers: [
                { provide: MAT_DIALOG_DATA, useValue: mockData },
                { provide: MatDialogRef, useValue: mockDialogRef }
            ],
        });

        const component = fixture.componentInstance;
        expect(component.data.dialogModel.message).toBe('How are you?');
    });
});