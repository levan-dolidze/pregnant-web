import { NavItem } from "./nav-item/nav-item";

export const navItems: NavItem[] = [
  {
    displayName: 'შესავალი',
    children: [
      { displayName: 'ვინ ვარ', route: '/courses/into/1' },
      { displayName: 'რას შეისწავლი', route: '/courses/into/2' },
    ],
  },
  {
    displayName: 'ბავშვის კვება',
    children: [
      { displayName: 'ძუძუთი კვება', route: '/courses/child-nutrition/3' },
      { displayName: 'ბოთლით კვება', route: '/courses/child-nutrition/4' },
    ],
  },
];
