import { BreakpointObserver, MediaMatcher } from '@angular/cdk/layout';
import { Component, inject, OnChanges, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSidenav, MatSidenavContent, MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';

import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/shared-module/material.module';
import { SidebarComponent } from './sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { buildNavItems } from './sidebar-data';
import { CoursesService } from 'src/app/features/my-courses/courses/data-access/courses.service';
import { SharedModule } from 'src/app/shared/shared-module/shared';
import { AppNavItemComponent } from './nav-item/nav-item.component';
import { CoreService } from './core.service';
import { AppSettings } from '../layout/utils/config';
import { CustomizerComponent } from './customizer/customizer.component';
import { NavItem } from './nav-item/nav-item';


const MOBILE_VIEW = 'screen and (max-width: 768px)';
const TABLET_VIEW = 'screen and (min-width: 769px) and (max-width: 1024px)';
const MONITOR_VIEW = 'screen and (min-width: 1024px)';
const BELOWMONITOR = 'screen and (max-width: 1023px)';

// for mobile app sidebar
interface apps {
  id: number;
  img: string;
  title: string;
  subtitle: string;
  link: string;
}

interface quicklinks {
  id: number;
  title: string;
  link: string;
}

@Component({
    selector: 'app-full',
    imports: [
        RouterModule,
        AppNavItemComponent,
        MaterialModule,
        MatSidenavModule,
        MatExpansionModule,
        MatDividerModule,
        CommonModule,
        SidebarComponent,
        HeaderComponent,
        CustomizerComponent,
        SharedModule
    ],
    templateUrl: './full.component.html',
    styleUrl: './full.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class FullComponent implements OnInit {

  private readonly settings = inject(CoreService);
  private readonly mediaMatcher = inject(MediaMatcher);
  private readonly router = inject(Router);
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly coursesService = inject(CoursesService);

  readonly navItems = buildNavItems(this.coursesService.chapters);

  @ViewChild('leftsidenav')
  public sidenav: MatSidenav;
  resView = false;
  @ViewChild('content', { static: true }) content!: MatSidenavContent;
  options = this.settings.options()
  private layoutChangesSubscription = Subscription.EMPTY;
  private isMobileScreen = false;
  private isContentWidthFixed = true;
  private isCollapsedWidthFixed = false;
  private htmlElement!: HTMLHtmlElement;

  get isOver(): boolean {
    return this.isMobileScreen;
  }

  get isTablet(): boolean {
    return this.resView;
  }


  // for mobile app sidebar
  // Note: title/subtitle hold i18n keys (resolved via t() in the template), not display text.
  apps: apps[] = [
    {
      id: 1,
      img: 'assets/images/svgs/icon-dd-chat.svg',
      title: 'Chat_Application',
      subtitle: 'Messages_And_Emails',
      link: '/apps/chat',
    },
    {
      id: 2,
      img: 'assets/images/svgs/icon-dd-cart.svg',
      title: 'Ecommerce_App',
      subtitle: 'Buy_A_Product',
      link: '/apps/email/inbox',
    },
    {
      id: 3,
      img: 'assets/images/svgs/icon-dd-invoice.svg',
      title: 'Invoice_App',
      subtitle: 'Get_Latest_Invoice',
      link: '/apps/invoice',
    },
    {
      id: 4,
      img: 'assets/images/svgs/icon-dd-date.svg',
      title: 'Calendar_App',
      subtitle: 'Get_Dates',
      link: '/apps/calendar',
    },
    {
      id: 5,
      img: 'assets/images/svgs/icon-dd-mobile.svg',
      title: 'Contact_Application',
      subtitle: 'Unsaved_Contacts',
      link: '/apps/contacts',
    },
    {
      id: 6,
      img: 'assets/images/svgs/icon-dd-lifebuoy.svg',
      title: 'Tickets_App',
      subtitle: 'Create_New_Ticket',
      link: '/apps/tickets',
    },
    {
      id: 7,
      img: 'assets/images/svgs/icon-dd-message-box.svg',
      title: 'Email_App',
      subtitle: 'Get_New_Emails',
      link: '/apps/email/inbox',
    },
    {
      id: 8,
      img: 'assets/images/svgs/icon-dd-application.svg',
      title: 'Courses',
      subtitle: 'Create_New_Course',
      link: '/apps/courses',
    },
  ];

  // Note: title holds an i18n key (resolved via t() in the template), not display text.
  quicklinks: quicklinks[] = [
    {
      id: 1,
      title: 'Pricing_Page',
      link: '/theme-pages/pricing',
    },
    {
      id: 2,
      title: 'Authentication_Design',
      link: '/authentication/login',
    },
    {
      id: 3,
      title: 'Register_Now',
      link: '/authentication/side-register',
    },
    {
      id: 4,
      title: 'Error_404_Page',
      link: '/authentication/error',
    },
    {
      id: 5,
      title: 'Notes_App',
      link: '/apps/notes',
    },
    {
      id: 6,
      title: 'Employee_App',
      link: '/apps/employee',
    },
    {
      id: 7,
      title: 'Todo_Application',
      link: '/apps/todo',
    },
  ];

  constructor() {
    this.htmlElement = document.querySelector('html')!;
    this.layoutChangesSubscription = this.breakpointObserver
      .observe([MOBILE_VIEW, TABLET_VIEW, MONITOR_VIEW, BELOWMONITOR])
      .subscribe((state) => {
        // SidenavOpened must be reset true when layout changes
        this.options.sidenavOpened = true;
        this.isMobileScreen = state.breakpoints[BELOWMONITOR];
        if (this.options.sidenavCollapsed == false) {
          this.options.sidenavCollapsed = state.breakpoints[TABLET_VIEW];
        }
        this.isContentWidthFixed = state.breakpoints[MONITOR_VIEW];
        this.resView = state.breakpoints[BELOWMONITOR];
      });

    // Initialize project theme with options
    this.receiveOptions(this.options);

    // This is for scroll to top
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((e) => {
        // this.content.scrollTo({ top: 0 });
      });
  }

  ngOnInit(): void {
  }

  onNavigateEmit(event: NavItem){

    console.log(event)
    // have to 
  }


  ngOnDestroy() {
    this.layoutChangesSubscription.unsubscribe();
  }

  toggleCollapsed() {
    this.isContentWidthFixed = false;
    this.options.sidenavCollapsed = !this.options.sidenavCollapsed;
    this.resetCollapsedState();
  }

  resetCollapsedState(timer = 400) {
    //setTimeout(() => this.settings.setOptions(this.options), timer);
    this.settings.setOptions(this.options)
  }

  onSidenavClosedStart() {
    this.isContentWidthFixed = false;
  }

  onSidenavOpenedChange(isOpened: boolean) {
    this.isCollapsedWidthFixed = !this.isOver;
    this.options.sidenavOpened = isOpened;
    this.settings.setOptions(this.options);
  }

  receiveOptions(options: AppSettings): void {
    this.options = options;
    this.toggleDarkTheme(options);
  }

  toggleDarkTheme(options: AppSettings) {
    if (options.theme === 'dark') {
      this.htmlElement.classList.add('dark-theme');
      this.htmlElement.classList.remove('light-theme');
    } else {
      this.htmlElement.classList.remove('dark-theme');
      this.htmlElement.classList.add('light-theme');
    }
  }
}
