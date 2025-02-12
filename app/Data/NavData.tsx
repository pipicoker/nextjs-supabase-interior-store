type NavDataItem = {
    id: string;
    title: string;
    path?: string;
}

const NavData: NavDataItem[] = [
    {
        id: "one",
        title: "Home",
        path: "/"
    },
    {
        id: "two",
        title: "Product",
        path: "/products"
    },
    {
        id: "three",
        title: "About Us",
        path: "/aboutUs"
    },
    {
        id: "four",
        title: "Contact Page",
        path: "/contact"
    },
]

export default NavData