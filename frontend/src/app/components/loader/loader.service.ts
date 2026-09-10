import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {

  private readonly isLoading = signal<boolean>(false);
  readonly isLoadingState = computed(this.isLoading);

  public updateLoader(updatedLoaderState:boolean) {
    this.isLoading.set(updatedLoaderState)
  }
}
