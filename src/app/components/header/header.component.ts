import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, Input, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { distinctUntilChanged, filter, map } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslocoModule } from '@jsverse/transloco';
import { selectStep } from 'src/app/shared/state/step-state/step-selectors';
import { Store } from '@ngrx/store';
import { LoaderService } from '../loader/loader.service';
import { MaterialModule } from 'src/app/shared/shared-module/material.module';
import { SharedModule } from 'src/app/shared/shared-module/shared';
import { MenuConfig } from './utils';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, RouterLink, RouterLinkActive, SharedModule, TranslocoModule, MaterialModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  readonly loaderService = inject(LoaderService);
  readonly destroyRef = inject(DestroyRef);
  readonly router = inject(Router);
  readonly activatedRoute = inject(ActivatedRoute);

  protected readonly store = inject(Store);

  readonly isLoadingState = this.loaderService.isLoadingState;
  readonly pageName = signal<string>('')
  readonly selectStep = toSignal(this.store.select(selectStep))

  @Input() session: string;

  readonly isMenuOpen = signal(false);
  toggleMenu(): void { this.isMenuOpen.update(v => !v); }


  private readonly backIcon = signal<boolean>(false)
  readonly backIconState = computed(() => this.backIcon())

  ngOnInit(): void {
    this.updateFromRoute();

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.updateFromRoute());
  }

  private updateFromRoute(): void {
    const route = this.getChild(this.activatedRoute);
    this.pageName.set(route.snapshot.data?.['pageName'] ?? '');
    this.backIcon.set(route.snapshot.data?.['back'] ?? false);
  }

  private getChild(route: ActivatedRoute): ActivatedRoute {
    let current = route;
    while (current.firstChild) {
      current = current.firstChild;
    }
    return current;
  }


  menuConfig = [
    // { routerLink: '/home',  name: 'Home', index: 0 },
    {
      name: 'For_Me', index: 1,
      children: [
        { name: 'Pregnant_School', routerLink: '/services' },
        { name: 'Shop',            routerLink: '/shop' }
      ]
    },
    { name: 'For_Children', index: 2, children: [] },
    { name: 'More',         index: 3, children: [] },
    { routerLink: '/about', name: 'Doctor',  index: 4 },
    { routerLink: '/blog',    name: 'Blog',    index: 5 },
    { routerLink: '/contact', name: 'Contact', index: 6 },
  ] as MenuConfig[]

  isChildActive(item: MenuConfig): boolean {
    return item.children?.some(c => this.router.url.startsWith(c.routerLink)) ?? false;
  }

  onBack() {
    globalThis.history.back();
  }


  readonly sessionId = toSignal(
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let route = this.activatedRoute;
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route.snapshot.params['session'] as string;
      }),
      distinctUntilChanged()
    )
  );



  onLogIn(){

  }

  
  onLogOut() {

  }

}
