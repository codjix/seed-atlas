import { z } from "zod";

// ===== Shared Types =====
export type Coord = z.infer<typeof coordSchema>;
export const coordSchema = z.object({
  x: z.number().int(),
  z: z.number().int(),
});

export type CommonContext = z.infer<typeof commonContextSchema>;
export const commonContextSchema = z.object({
  seed: z.string().min(1),
  versionId: z.number().int().min(1).max(34),
  dimension: z.number().int().min(-1).max(1).default(0),
  biomeHeight: z.number().int().min(-64).max(320).default(256),
  coordinates: coordSchema.default({ x: 0, z: 0 }),
  isLargeBiome: z.boolean().default(false),
});

export type Target = z.infer<typeof targetSchema>;
export const targetSchema = z.object({
  targetId: z.number().int().nonnegative(),
  distance: z.number().nonnegative(),
  attributes: z.array(z.object({ key: z.string().min(1), value: z.string() })).default([]),
  coord: coordSchema,
});

// ===== Finder Types =====
export type TargetType = z.infer<typeof targetTypeSchema>;
export const targetTypeSchema = z.enum(["biome", "structure"]);

export type SearchRequest = z.infer<typeof searchRequestSchema>;
export const searchRequestSchema = commonContextSchema.extend({
  targetType: targetTypeSchema,
  targetId: z.number().int().nonnegative(),
  radius: z.number().int().positive().optional(),
  limit: z.number().int().min(1).max(100).default(20),
  page: z.number().int().min(1).default(1),
});

export type SearchResponse = z.infer<typeof searchResponseSchema>;
export const searchResponseSchema = z.object({
  results: z.array(targetSchema).default([]),
  meta: z.object({
    searchTime: z.number().nonnegative(),
    total: z.number().int().nonnegative(),
  }),
});

// ===== Map Types =====
export type Render = z.infer<typeof renderSchema>;
export const renderSchema = commonContextSchema.extend({
  view: z.object({
    height: z.number().int().positive(),
    width: z.number().int().positive(),
    zoom: z.number().min(1).max(256),
  }),
});

export type MarkersRequest = z.infer<typeof markersRequestSchema>;
export const markersRequestSchema = renderSchema.extend({
  structures: z.array(z.number().int().nonnegative()).default([]),
  // view.height: viewport height, 0.5 height - coordinates.y = y1, 0.5 height + coordinates.y = y2,
  // view.width: viewport width, 0.5 width - coordinates.x = x1, 0.5 width + coordinates.x = x2,
});

export type MarkersResponse = z.infer<typeof markersResponseSchema>;
export const markersResponseSchema = z.array(targetSchema).default([]);

export type TileRequest = z.infer<typeof tileRequestSchema>;
export const tileRequestSchema = renderSchema.extend({
  biomes: z.array(z.number().int().nonnegative()).default([]),
  // view.height: tile size, coordinates.y = y1, coordinates.y + view.height = y2,
  // view.width: tile size, coordinates.x = x1, coordinates.x + view.width = x2,
});

export type TileResponse = z.infer<typeof tileResponseSchema>;
// tile pixels to draw mapped to biome ids
export const tileResponseSchema = z.array(z.number().int().nonnegative()).default([]);
