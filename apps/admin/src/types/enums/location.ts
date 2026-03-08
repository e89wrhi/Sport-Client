export const LocationType = {
  Global: 'Global',
  Africa: 'Africa',
  Ethiopia: 'Ethiopia',
} as const;

export type LocationType = (typeof LocationType)[keyof typeof LocationType];
