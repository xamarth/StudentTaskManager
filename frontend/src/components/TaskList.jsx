import TaskCard from "./TaskCard";
import { DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableTask({ task, children }) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
  } = useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children({ dragHandleProps: { ...attributes, ...listeners } })}
    </div>
  );
}

export default function TaskList({ tasks, setTasks, refresh, onEdit }) {
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setTasks((items) => {
      const oldIndex = items.findIndex((t) => t._id === active.id);
      const newIndex = items.findIndex((t) => t._id === over.id);
      return arrayMove(items, oldIndex, newIndex);
    });
  };

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center">
        <p className="mb-2 text-gray-500">
          No tasks yet
        </p>
        <p className="text-sm text-gray-400">
          Click “Add Task” to get started
        </p>
      </div>
    );
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <SortableContext items={tasks.map((t) => t._id)}>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <SortableTask key={task._id} task={task}>
              {({ dragHandleProps }) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  refresh={refresh}
                  onEdit={onEdit}
                  dragHandleProps={dragHandleProps}
                />
              )}
            </SortableTask>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
