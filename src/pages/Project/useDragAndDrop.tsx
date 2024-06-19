import {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useMemo, useState } from "react";
import { Column } from "../../services/columns/columns.types";
import { Ids, findColumn } from "./utils";
import { useColumnService } from "../../services/columns/columns.service";
import { useTasksService } from "../../services/tasks/tasks.service";
import { Task } from "../../services/tasks/tasks.types";

export const useDragAndDrop = (columns: Column[], uuid: string) => {
  const [activeItem, setActiveItem] = useState<Task>();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const { updateTaskOrder } = useTasksService();
  const { sortTasks, sortTasksThroughColumns } = useColumnService();

  const ids: Ids = useMemo(() => {
    return columns.reduce((prevValue, currentValue) => {
      return {
        ...prevValue,
        [currentValue.uuid]: currentValue.tasks.map((task) => task.uuid),
      };
    }, {});
  }, [columns]);

  const handleDragStart = ({ active }: DragStartEvent) => {
    const activeColumnId = findColumn(active.id, ids);
    const activeItem = columns
      .find((column) => column.uuid === activeColumnId)
      ?.tasks.find((task) => task.uuid === active.id)!;

    setActiveItem(activeItem);
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    const { id } = active;
    const overId = over?.id;

    if (overId === null || id in ids) {
      return;
    }

    const overColumn = findColumn(overId || "", ids);
    const activeColumn = findColumn(active.id, ids);

    if (!overColumn || !activeColumn) {
      return;
    }

    if (activeColumn !== overColumn) {
      const activeItems = ids[activeColumn];
      const overItems = ids[overColumn];
      const overIndex = overItems.indexOf(overId || "");
      const activeIndex = activeItems.indexOf(id);

      let newIndex: number;

      if (overId || "" in ids) {
        newIndex = overItems.length + 1;
      } else {
        const isBelowOverItem =
          over &&
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height;

        const modifier = isBelowOverItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      // recentlyMovedToNewContainer.current = true;

      const activeColumnIndex = columns.findIndex(
        (column) => column.uuid === activeColumn
      );

      const overColumnIndex = columns.findIndex(
        (column) => column.uuid === overColumn
      );

      const activeColumnTasks = columns[activeColumnIndex].tasks.filter(
        (task) => task.uuid !== active.id
      );

      const overColumnTasks = [
        ...columns[overColumnIndex].tasks.slice(0, newIndex),
        columns[activeColumnIndex].tasks[activeIndex],
        ...columns[overColumnIndex].tasks.slice(
          newIndex,
          columns[overColumnIndex].tasks.length
        ),
      ];

      let result = structuredClone(columns);

      result[activeColumnIndex].tasks = activeColumnTasks;
      result[overColumnIndex].tasks = overColumnTasks;

      sortTasksThroughColumns(result);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const { id } = active;

    const activeColumn = findColumn(String(id), ids);
    const overColumn = findColumn(String(over?.id), ids);

    if (!activeColumn || !overColumn || activeColumn !== overColumn) {
      return;
    }

    const activeIndex = ids[activeColumn].indexOf(String(id));
    const overIndex = ids[overColumn].indexOf(String(over?.id));

    const activeColumnTasks =
      columns.find((column) => column.uuid === activeColumn)?.tasks || [];

    const result = arrayMove(activeColumnTasks, activeIndex, overIndex);
    sortTasks(result, activeColumn);

    updateTaskOrder({
      columnUuid: activeColumn,
      taskUuid: String(id),
      order: overIndex + 1,
      projectUuid: uuid || "",
    });
  };

  return {
    activeItem,
    sensors,
    handleDragEnd,
    handleDragOver,
    handleDragStart,
  };
};
