export interface List {
  id: number;
  title: string;
  href: string;
}
export const navList1: List[] = [
  {
    id: 1,
    title: "Home",
    href: "/",
  },
  {
    id: 2,
    title: "About Us",
    href: "/about-us",
  },
  {
    id: 3,
    title: "Contact Us",
    href: "/contact-us",
  },
];
