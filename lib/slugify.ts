export const slugify = (text: string) => 
  text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '').slice(0, 50);

export const withAutoIds = <T extends { title: string }>(
  items: T[]
): (T & { id: string })[] => {
  return items.map((item, index) => ({
    id: index === 0 ? slugify(item.title) : `${slugify(item.title)}-${index}`,
    ...item,
  }));
};
