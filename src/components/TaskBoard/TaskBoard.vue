<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { Field } from 'vee-validate'
import services from '@/services'
import { Tooltip, Modal } from 'bootstrap'
import { ManageTaskModal, TaskList, ViewTaskModal } from './components'

const task_date = ref(new Date().toLocaleDateString('fr-CA'))
const tasks = ref([])
const selectedTask = ref(null)
const editingTask = ref(null)

const fetchTasksByDate = async (date) => {
  try {
    const response = await services.tasks.list({
      task_date: date
    })

    if (task_date.value !== date) {
      task_date.value = date
    }

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
  const modal = new Modal(document.getElementById('viewTaskModal'))
  modal.show()
}

const manageCompleteTask = async (task) => {
  try {
    await services.tasks.update(task.id, { completed: !task.completed })
    fetchTasksByDate(task_date.value)
  } catch (error) {
    console.error('Erro ao concluir tarefa:', error)
  }
}

const deleteTask = async (task) => {
  try {
    await services.tasks.destroy(task.id)
    fetchTasksByDate(task_date.value)
  } catch (error) {
    console.error('Erro ao excluir tarefa:', error)
  }
}

const openEditTaskModal = (task) => {
  editingTask.value = task
  const modal = new Modal(document.getElementById('ManageTaskModal'))
  modal.show()
}

const closeTaskModal = () => {
  editingTask.value = null
}

watch(task_date, async (newDate, oldDate) => {
  if (newDate !== oldDate) {
    await fetchTasksByDate(newDate)
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
    style="max-width: 700px"
  >
    <div class="card-header text-center">
      <div>
        <div class="d-flex justify-content-between align-items-center mb-2">
          <h4>Tarefas</h4>
          <button
            class="btn btn-light"
            data-bs-target="#ManageTaskModal"
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
      @manageCompleteTask="manageCompleteTask"
      @deleteTask="deleteTask"
      @opendEditTaskModal="openEditTaskModal"
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
      @manageCompleteTask="manageCompleteTask"
      @deleteTask="deleteTask"
    />
  </div>
  <ManageTaskModal
    @fetchTasksByDate="(date) => fetchTasksByDate(date)"
    @closeTaskModal="closeTaskModal"
    :task="editingTask"
    :task_date="task_date"
  />
  <ViewTaskModal :task="selectedTask" />
</template>
