<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  tasks: Array,
  title: String,
  completed: Boolean
})

const emit = defineEmits(['view'])
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
            :disabled="completed"
          />
          <label
            class="form-check-label text-truncate w-100"
            :for="'task-' + task.id"
          >
            {{ task.title }}
          </label>
        </div>
        <div class="d-flex align-items-center">
          <i
            v-if="!completed"
            class="bi bi-check-circle me-2"
            data-bs-toggle="tooltip"
            data-bs-title="Concluir"
            style="font-size: 1.2rem; cursor: pointer"
          ></i>
          <i
            class="bi bi-eye"
            data-bs-toggle="tooltip"
            data-bs-title="Visualizar"
            style="font-size: 1.5rem; cursor: pointer"
            @click="emit('view', task)"
          ></i>
          <i
            class="bi bi-x"
            data-bs-toggle="tooltip"
            data-bs-title="Excluir"
            style="font-size: 1.8rem; cursor: pointer"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>
