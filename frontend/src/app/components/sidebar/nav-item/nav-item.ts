export interface NavItem {
  chapter?: string;
  name?: string;
  route?: string;
  sections?: NavItem[];
}
