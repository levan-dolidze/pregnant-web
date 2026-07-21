import { NavItem } from "./nav-item/nav-item";

export const navItems: NavItem[] = [
  {
    displayName: 'შესავალი',
    iconName: '',
    permission: [],
    children: [
      { displayName: 'ტესტი 1', iconName: '', route: '/courses/test/1', permission: [] },
      { displayName: 'ტესტი 2', iconName: '', route: '/courses/test/2', permission: [] },
      { displayName: 'ტესტი 3', iconName: '', route: '/courses/test/3', permission: [] },
    ],
  },
];
