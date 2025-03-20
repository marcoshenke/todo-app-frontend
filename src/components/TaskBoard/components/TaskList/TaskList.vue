<script setup>
import { defineProps } from 'vue'

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
  'opendEditTaskModal'
])
</script>

<template>
  <div v-if="tasks.length > 0" class="border-top border-light">
    <div class="card-body">
      <h5 class="card-title">{{ title }}</h5>
      <div
        v-for="task in tasks"
        :key="task.id"
        class="d-flex align-items-center justify-content-between"
      >
        <div class="form-check w-100 d-flex align-items-center">
          <input
            class="form-check-input flex-shrink-0"
            type="checkbox"
            :value="task.id"
            :id="'task-' + task.id"
            :checked="completed"
            @change="emit('manageCompleteTask', task)"
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
    </div>
  </div>
</template>
