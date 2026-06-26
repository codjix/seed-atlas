import {
  Card,
  Container,
  Divider,
  Group,
  Image,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import logo from "@/assets/images/logo.webp";
import { Iconify } from "@/components/iconify";
import { PageLayout } from "@/components/layout";
import { CONFIG } from "@/features/const";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: `${CONFIG.title} - About` }] }),
  component: () => {
    return (
      <Container p={0}>
        <PageLayout title="About" withBack>
          <Stack component={Card}>
            <Group gap={5} align="flex-start">
              <Image w={50} src={logo} alt="logo" />
              <Title order={1} fz={40}>
                {CONFIG.title}
              </Title>
            </Group>
            <Text>{CONFIG.description}</Text>
            <Text fz="sm" c="dimmed">
              Version {CONFIG.version}
            </Text>
          </Stack>
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            {features.map((feature) => (
              <Stack component={Card} p={20} key={feature.title} gap={5}>
                <ThemeIcon variant="light" size="xl" mb={5}>
                  <Iconify width={25} icon={feature.icon} />
                </ThemeIcon>
                <Text fw="bold">{feature.title}</Text>
                <Text fz="sm" c="dimmed">
                  {feature.description}
                </Text>
              </Stack>
            ))}
          </SimpleGrid>
          <Divider />
          <Text>
            Copyright &copy; {new Date().getFullYear()} {CONFIG.title}. All rights reserved.
          </Text>
        </PageLayout>
      </Container>
    );
  },
});

const features = [
  {
    title: "Minecraft Map",
    description: "Explore the Minecraft world map without creating it",
    icon: "solar:map-bold",
  },
  {
    title: "Biome Lookup",
    description: "Lookup and highlight biomes at a given coordinate",
    icon: "solar:earth-bold",
  },
  {
    title: "Structure Lookup",
    description: "Lookup and filter structures in a given radius",
    icon: "solar:buildings-2-bold",
  },
  {
    title: "Modern Design",
    description: "A modern and responsive design easy to use",
    icon: "solar:palette-bold",
  },
  {
    title: "Fast Performance",
    description: "Fast and lightweight rendering with wasm and workers",
    icon: "solar:bolt-bold",
  },
  {
    title: "Open Source",
    description: "Open source and free to use",
    icon: "solar:code-bold",
  },
];
