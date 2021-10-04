import ImageLinks from "./ImageLinks"

export const getIconForType = (type: string) => {
  if (type.includes('image')) return ImageLinks.imagePlaceholder;
  if (type.includes('pdf')) return ImageLinks.pdf;
  if (type.includes('xls')) return ImageLinks.xls;
  if (type.includes('zip')) return ImageLinks.zip;
  return ImageLinks.unknown;
}