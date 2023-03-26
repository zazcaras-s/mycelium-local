"use client";
import "./globals.css";

import { TextProvider } from "@/hooks/textContext";
import { Container, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { AiOutlineAppstoreAdd, AiOutlineUserSwitch } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import {
  MdLogin,
  MdProductionQuantityLimits,
  MdShoppingCart,
  MdTag,
} from "react-icons/md";
import { TbPlugConnected, TbReportAnalytics } from "react-icons/tb";
import { VscSymbolString } from "react-icons/vsc";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import NavDrawer from "../components/NavDrawer";
import { UserProvider } from "../hooks/userContext";
import theme from "../theme";

const navItems = [
  {
    name: "Categories",
    href: "/categories",
    icon: <MdTag />,
  },
  {
    name: "Cart",
    href: "/user/cart",
    icon: <MdShoppingCart />,
    privileges: 1,
  },
  {
    name: "Users",
    href: "/admin/users",
    icon: <AiOutlineUserSwitch />,
    privileges: 2,
  },
  {
    name: "New Product",
    href: "/admin/product/create",
    icon: <AiOutlineAppstoreAdd />,
    privileges: 2,
  },
  {
    name: "Product Administration",
    href: "/admin/product",
    icon: <BiCategory />,
    privileges: 2,
  },
  {
    name: "Category Administration",
    href: "/admin/category",
    icon: <BiCategory />,
    privileges: 2,
  },
  {
    name: "Orders Administration",
    href: "/admin/orders",
    icon: <MdProductionQuantityLimits />,
    privileges: 2,
  },
  {
    name: "Reports",
    href: "/admin/reports",
    icon: <TbReportAnalytics />,
    privileges: 2,
  },
  {
    name: "Integrations",
    href: "/admin/integrations",
    icon: <TbPlugConnected />,
    privileges: 2,
  },
  {
    name: "Text Administration",
    href: "/admin/text",
    icon: <VscSymbolString />,
    privileges: 2,
  },
  {
    name: "Login",
    href: "/login",
    icon: <MdLogin />,
    privileges: 0,
  },
  {
    name: "Register",
    href: "/register",
    icon: <MdLogin />,
    privileges: 0,
  },
];

export default function Layout({ children }) {
  const [drawer, setDrawer] = useState(false);
  const searchParams = useSearchParams();

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
        */}
      <head />
      <body>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <UserProvider>
              <TextProvider>
                <CssBaseline />
                <NavBar
                  onDrawer={() => setDrawer(true)}
                  defaultSearchQuery={searchParams.get("q") ?? ""}
                />
                <NavDrawer
                  open={drawer}
                  onClose={() => setDrawer(false)}
                  items={navItems}
                />
                <Container className="mt-[6rem]" maxWidth="lg">
                  {children}
                </Container>
                <Footer />
              </TextProvider>
            </UserProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
