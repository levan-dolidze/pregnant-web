
export interface MenuConfig {
    routerLink?: string;
    name: string;
    index: number;
    permission?: string;
    children?: { name: string; routerLink: string }[];
}
