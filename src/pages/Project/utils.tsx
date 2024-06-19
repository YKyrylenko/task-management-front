import {
  DropAnimation,
  UniqueIdentifier,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";

export type Ids = {
  [key: UniqueIdentifier]: UniqueIdentifier[];
};

export const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.5",
      },
    },
  }),
};

export const findColumn = (id: UniqueIdentifier, items: Ids) => {
  if (id in items) {
    return String(id);
  }

  return Object.keys(items).find((key) => items[key].includes(String(id)));
};
