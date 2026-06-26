import { createFileRoute } from "@tanstack/react-router";
import { MapView } from "@/features/map-core";

export const Route = createFileRoute("/")({
  component: () => {
    return <MapView />;
  },
});
