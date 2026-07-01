import { AppShell, Divider, ScrollArea, SegmentedControl } from "@mantine/core";
import { Activity, useState } from "react";
import { BiomeSearch, MapControls, StructureSearch } from "@/features/map-manager";
import { Header } from "../header";

export const NavBar = () => {
  const [value, setValue] = useState("map");

  const tabs = [
    { value: "map", label: "Map" },
    { value: "biomes", label: "Biomes" },
    { value: "structures", label: "Structures" },
  ];

  return (
    <AppShell.Navbar zIndex={10}>
      <Header />
      <Divider />
      <AppShell.Section>
        <SegmentedControl
          value={value}
          onChange={setValue}
          data={tabs}
          fullWidth
          size="md"
          mx={20}
          mt={10}
        />
      </AppShell.Section>
      <AppShell.Section component={ScrollArea} px={20} flex={1} grow>
        <Activity mode={value === "map" ? "visible" : "hidden"}>
          <MapControls />
        </Activity>
        <Activity mode={value === "biomes" ? "visible" : "hidden"}>
          <BiomeSearch />
        </Activity>
        <Activity mode={value === "structures" ? "visible" : "hidden"}>
          <StructureSearch />
        </Activity>
        <br />
      </AppShell.Section>
    </AppShell.Navbar>
  );
};
