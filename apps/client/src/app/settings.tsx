import { Container } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout";
import { CONFIG } from "@/features/const";
import { AppearanceSettings } from "@/features/settings";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: `${CONFIG.title} - Settings` }] }),
  component: () => {
    return (
      <Container p={0}>
        <PageLayout title="Settings" withBack>
          <AppearanceSettings />
        </PageLayout>
      </Container>
    );
  },
});
