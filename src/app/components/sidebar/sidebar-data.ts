import { NavItem } from "./nav-item/nav-item";

export const navItems: NavItem[] = [
  {
    displayName: 'შესავალი',
    children: [
      { displayName: 'ვინ ვარ', route: '/courses/test/1' },
      { displayName: 'რას შეისწავლი', route: '/courses/test/2' },
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
