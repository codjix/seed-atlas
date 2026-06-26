import { AppShell } from "@mantine/core";
import { useLocation } from "@tanstack/react-router";
import { NavBar, NavbarToggle, useNavBar } from "../navbar";
import { ScrollTop } from "../scroll-top";
import { ShortcutsView } from "../shortcuts";

export const Layout = ({ children }: { children?: React.ReactNode }) => {
  const [opened] = useNavBar();
  const disabled = useLocation().pathname !== "/";
  const navbar = {
    width: 400,
    collapsed: { mobile: !opened, desktop: !opened },
    breakpoint: "sm",
  };

  return (
    <AppShell h="100%" navbar={navbar} disabled={disabled}>
      <NavBar />
      {!disabled && <NavbarToggle />}
      <AppShell.Main h="100%">
        {children}
        <ShortcutsView />
        <ScrollTop />
      </AppShell.Main>
    </AppShell>
  );
};
