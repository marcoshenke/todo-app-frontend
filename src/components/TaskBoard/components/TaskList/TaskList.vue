<script setup>
import { defineProps, defineEmits } from 'vue'
import draggable from 'vuedraggable'

const props = defineProps({
  tasks: Array,
  title: String,
  completed: Boolean,
  isLoading: Boolean
})

const emit = defineEmits([
  'view',
  'manageCompleteTask',
  'deleteTask',
  'opendEditTaskModal',
  'updateTasksOrder'
])

const onDragEnd = (event) => {
  emit('updateTasksOrder', props.tasks)
}
</script>

<template>
  <div v-if="tasks.length > 0" class="border-top border-light">
    <div class="card-body">
      <h5 class="card-title">
        {{ title }}
        <small
          class="text-muted"
          data-bs-toggle="tooltip"
          data-bs-title="Drag tasks to reorder"
          v-if="!completed"
        >
          (Drag to reorder)
        </small>
      </h5>
      <draggable
        :list="props.tasks"
        group="tasks"
        @end="onDragEnd"
        :ghost-class="!completed ? 'dragging' : ''"
        :chosen-class="!completed ? 'drop-target' : ''"
        class="d-flex flex-column gap-2"
      >
        <template #item="{ element: task }">
          <div
            class="d-flex align-items-center justify-content-between"
            :class="{ 'draggable-item': !completed }"
            :key="task.id"
          >
            <i
              class="bi bi-grip-vertical me-2 mt-2"
              style="font-size: 1.2rem; cursor: grab"
              data-bs-toggle="tooltip"
              data-bs-title="Drag to reorder"
              v-if="!completed"
            ></i>
            <div class="form-check w-100 d-flex align-items-center">
              <input
                class="form-check-input flex-shrink-0"
                type="checkbox"
                :value="task.id"
                :id="'task-' + task.id"
                :checked="task.completed"
                @change="
                  (event) => {
                    console.log(
                      'Checkbox alterada:',
                      task,
                      'Novo valor:',
                      event.target.checked
                    )
                    emit('manageCompleteTask', task)
                  }
                "
              />
              <label
                class="mx-2 form-check-label text-truncate w-100"
                :for="'task-' + task.id"
                :class="{ 'text-decoration-line-through': completed }"
              >
                {{ task.title }}
              </label>
            </div>
            <div class="d-flex align-items-center">
              <i
                class="bi bi-eye me-2"
                data-bs-toggle="tooltip"
                data-bs-title="View"
                style="font-size: 1.5rem; cursor: pointer"
                @click="emit('view', task)"
              ></i>
              <i
                class="bi bi-pencil-square me-1"
                data-bs-toggle="tooltip"
                data-bs-title="Editar"
                v-if="!completed"
                style="font-size: 1.2rem; cursor: pointer"
                @click="emit('opendEditTaskModal', task)"
              ></i>
              <i
                class="bi bi-x"
                data-bs-toggle="tooltip"
                data-bs-title="Delete"
                style="font-size: 1.8rem; cursor: pointer"
                @click="!isLoading && emit('deleteTask', task)"
              ></i>
            </div>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>
