import { NavItem } from "./nav-item/nav-item";

export const navItems: NavItem[] = [
  {
    displayName: 'შესავალი',
    children: [
      { displayName: 'ტესტი 1', route: '/courses/test/1' },
      { displayName: 'ტესტი 2', route: '/courses/test/2' },
      { displayName: 'ტესტი 3', route: '/courses/test/3' },
    ],
  },
  {
    displayName: 'ბავშვის კვება',
    children: [
      { displayName: 'ძუძუთი კვება', route: '/courses/child-nutrition/breastfeeding' },
      { displayName: 'ბოთლით კვება', route: '/courses/child-nutrition/bottle-feeding' },
    ],
  },
];
