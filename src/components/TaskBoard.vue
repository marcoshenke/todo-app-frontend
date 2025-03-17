<script setup>
import { ref, watch } from 'vue'
import { CreateTaskModal } from '@/components'
import { Field } from 'vee-validate'
import services from '@/services'

const task_date = ref('')
const tasks = ref([])

const fetchTasksByDate = async (date) => {
  try {
    const response = await services.tasks.list({
      task_date: date
    })
    console.log(response)
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error)
  }
}

watch(task_date, (newDate) => {
  if (newDate) {
    fetchTasksByDate(new Date(newDate))
  }
})
</script>

<template>
  <div
    class="card text-bg-dark mb-3 border border-light w-100 align-self-center"
    style="max-width: 1000px"
  >
    <div class="card-header text-center">
      <div>
        <div class="d-flex justify-content-between align-items-center mb-2">
          <h4>Tarefas</h4>
          <button
            class="btn btn-light"
            data-bs-target="#createTaskModal"
            data-bs-toggle="modal"
          >
            Nova
          </button>
        </div>
        <Field
          name="task_date"
          class="form-control"
          v-model="task_date"
          type="date"
        />
      </div>
    </div>
    <div v-if="tasks.lenght > 0">
      <div class="card-body">
        <h5 class="card-title">Pendentes</h5>
        <div class="d-flex align-items-center">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            <label class="form-check-label" for="flexCheckDefault">
              Default checkbox
            </label>
          </div>
          <i class="bi bi-x" style="font-size: 1.5rem; cursor: pointer"></i>
        </div>
      </div>
      <div class="card-body border-top border-light">
        <h5 class="card-title">Concluídas</h5>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
          <label class="form-check-label" for="flexCheckDefault">
            Default checkbox
          </label>
        </div>
      </div>
    </div>
  </div>
  <CreateTaskModal />
</template>
