<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { Field } from 'vee-validate'
import services from '@/services'
import { Tooltip, Modal } from 'bootstrap'
import { CreateTaskModal, TaskList, ViewTaskModal } from './components'

const task_date = ref(new Date().toLocaleDateString('fr-CA'))
const tasks = ref([])
const selectedTask = ref(null)

const fetchTasksByDate = async (date) => {
  try {
    const response = await services.tasks.list({
      task_date: date
    })
    tasks.value = response
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error)
  }
}

const completedTasks = computed(() =>
  tasks.value.filter((task) => task.completed)
)

const pendingTasks = computed(() =>
  tasks.value.filter((task) => !task.completed)
)

const viewTask = (task) => {
  selectedTask.value = task
  console.log(task)
  const modal = new Modal(document.getElementById('viewTaskModal'))
  modal.show()
}

watch(task_date, (newDate) => {
  if (newDate) {
    fetchTasksByDate(new Date(newDate))
  }
})

onMounted(() => {
  fetchTasksByDate(task_date.value)
  new Tooltip(document.body, {
    selector: "[data-bs-toggle='tooltip']"
  })
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

    <TaskList
      :tasks="pendingTasks"
      title="Pendentes"
      :completed="false"
      @view="viewTask"
    />

    <div
      v-if="pendingTasks.length === 0"
      class="text-center p-3 border-top border-light"
    >
      <p>Nenhuma tarefa pendente encontrada para esta data.</p>
    </div>

    <TaskList
      :tasks="completedTasks"
      title="Concluídas"
      :completed="true"
      @view="viewTask"
    />
  </div>
  <CreateTaskModal />
  <ViewTaskModal :task="selectedTask" />
</template>
