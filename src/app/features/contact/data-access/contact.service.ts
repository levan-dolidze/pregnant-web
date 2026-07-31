import { computed, DestroyRef, inject, Injectable, signal } from '@angular/core';
import { ApiService } from 'src/app/core/api-service/api.service';
import { ContactInfoModel, ContactInfoSource } from '../utils/model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';

export interface ContactRequest {
  mobileNumber: string | null;
  question: string | null;
}
const basePath = '/Contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private readonly apiService = inject(ApiService);
  destroyRef = inject(DestroyRef);

  contactInfo = signal<ContactInfoSource | null>(null);
  readonly contactInfoState = computed(() => this.contactInfo())
  contactInfoLoading$ = this.getContactInfo()

  readonly contact = computed(() => this.contactInfo().data);
  readonly laoding = computed(() => this.contactInfo().loader);

  constructor() {
    this.contactInfoLoading$.pipe(takeUntilDestroyed(this.destroyRef),
      finalize(() => this.contactInfo.update((x) => ({ ...x, loader: false })))
    ).subscribe({
      next: (res) => {
        this.contactInfo.update((x) => ({ data: res,loader:false }))
      },

      error: (err: any) => {
        console.error(err);
      },

    });
  }


  getContactInfo() {
    return this.apiService.get(`${basePath}/GetContactInfo`)
  }



}
