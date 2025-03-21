<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { Field } from 'vee-validate'
import services from '@/services'
import { Tooltip, Modal } from 'bootstrap'

import { ManageTaskModal, TaskList, ViewTaskModal } from './components'
import { LoadingCircle } from '@/components'
import { toastBar } from '@/helpers'

const task_date = ref(new Date().toLocaleDateString('fr-CA'))
const tasks = ref([])
const selectedTask = ref(null)
const editingTask = ref(null)
const isLoading = ref(false)

const fetchTasksByDate = async (date) => {
  try {
    isLoading.value = true
    const response = await services.tasks.list({
      task_date: date
    })

    if (task_date.value !== date) {
      task_date.value = date
    }
    tasks.value = response
  } catch (error) {
    console.error('Error fetching Tasks:', error)
    toastBar({
      message: 'An unexpected error occurred while fetching tasks',
      type: 'error'
    })
  } finally {
    isLoading.value = false
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
  const modal = Modal.getOrCreateInstance(
    document.querySelector('#viewTaskModal')
  )
  modal.show()
}

const openEditTaskModal = (task) => {
  editingTask.value = task
  const modal = Modal.getOrCreateInstance(
    document.querySelector('#manageTaskModal')
  )
  modal.show()
}

const closeTaskModal = () => {
  editingTask.value = null
  const modal = Modal.getOrCreateInstance(
    document.querySelector('#manageTaskModal')
  )
  modal.hide()
}

const manageCompleteTask = async (task) => {
  try {
    isLoading.value = true
    await services.tasks.update(task.id, { completed: !task.completed })
    fetchTasksByDate(task_date.value)
  } catch (error) {
    console.error('Error completing task:', error)
    toastBar({
      message: 'An unexpected error occurred while completing task',
      type: 'error'
    })
  } finally {
    isLoading.value = false
  }
}

const deleteTask = async (task) => {
  try {
    isLoading.value = true
    await services.tasks.destroy(task.id)
    fetchTasksByDate(task_date.value)
  } catch (error) {
    console.error('Error when deleting task:', error)
    toastBar({
      message: 'An unexpected error occurred while deleting task',
      type: 'error'
    })
  } finally {
    isLoading.value = false
  }
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
  <LoadingCircle :isLoading="isLoading" />
  <div
    class="card text-bg-dark mb-3 border border-light w-100 align-self-center mw-500px"
  >
    <div class="card-header text-center">
      <div>
        <div class="d-flex justify-content-between align-items-center mb-2">
          <h4>Tasks</h4>
          <button class="btn button_secondary" @click="openEditTaskModal(null)">
            New
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
      title="Pending"
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
      <p>No pending tasks found for this date.</p>
    </div>
    <TaskList
      :tasks="completedTasks"
      title="Completed"
      :completed="true"
      @view="viewTask"
      @manageCompleteTask="manageCompleteTask"
      @deleteTask="deleteTask"
      :isLoading="isLoading"
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
