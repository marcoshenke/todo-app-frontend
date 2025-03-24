<script setup>
import { ref, watch } from 'vue'
import { useForm, useField, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

import services from '@/services'
import { LoadingCircle } from '@/components'
import { toastBar } from '@/helpers'

const emit = defineEmits(['fetchTasksByDate', 'closeTaskModal'])

const isLoading = ref(false)

const props = defineProps({
  task: Object,
  task_date: String
})

const schema = yup.object({
  title: yup.string().max(50).required('Title is mandatory'),
  description: yup.string(),
  task_date: yup.date().nullable().typeError('Invalid date')
})

const { value: title } = useField('title')
const { value: description } = useField('description')
const { value: task_date } = useField('task_date')

const { handleSubmit, resetForm, setValues } = useForm({
  validationSchema: schema
})

const closeModal = () => {
  emit('closeTaskModal')
  resetForm()
}

const saveTask = async (paramsFormated) => {
  if (props.task) {
    return await services.tasks.update(props.task.id, paramsFormated)
  }
  await services.tasks.create(paramsFormated)
}

const onSubmit = handleSubmit(async (formValues) => {
  try {
    isLoading.value = true
    const paramsFormated = {
      title: formValues.title,
      description: formValues.description,
      task_date: formValues.task_date ? new Date(formValues.task_date) : null
    }

    await saveTask(paramsFormated)

    emit('fetchTasksByDate', formValues.task_date)
    closeModal()
    toastBar({
      message: `Task was ${props.task ? 'edited' : 'saved'} successfully`,
      type: 'success'
    })
  } catch (error) {
    console.error('Error saving task:', error)
    toastBar({
      message: 'An unexpected error occurred while saving task',
      type: 'error'
    })
  } finally {
    isLoading.value = false
  }
})

watch(
  () => props.task,
  (newTask) => {
    if (newTask) {
      setValues({
        title: newTask.title,
        description: newTask.description || '',
        task_date: newTask.task_date
          ? new Date(newTask.task_date).toISOString().split('T')[0]
          : ''
      })
      return
    }

    resetForm()
    setValues({
      title: '',
      description: '',
      task_date: new Date().toISOString().split('T')[0]
    })
  },
  { immediate: true }
)
</script>

<template>
  <div class="py-2">
    <LoadingCircle :isLoading="isLoading" />
    <div class="modal" id="manageTaskModal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content bg-dark p-3">
          <div class="modal-header">
            <h4 class="modal-title">
              {{ task ? 'Edit Task' : 'Create Task' }}
            </h4>
          </div>
          <div class="modal-body">
            <form @submit.prevent="onSubmit">
              <div class="mb-3">
                <label class="form-label">Title</label>
                <Field
                  name="title"
                  type="text"
                  v-model="title"
                  class="form-control"
                />
                <ErrorMessage name="title" class="text-danger" />
              </div>

              <div class="mb-3">
                <label class="form-label">Description</label>
                <Field
                  name="description"
                  type="text"
                  v-model="description"
                  class="form-control"
                  as="textarea"
                />
              </div>

              <div class="mb-3">
                <label class="form-label">Task date</label>
                <Field
                  name="task_date"
                  type="date"
                  v-model="task_date"
                  class="form-control"
                />
                <ErrorMessage name="task_date" class="text-danger" />
              </div>
              <div class="modal-footer d-flex gap-2">
                <button
                  type="button"
                  class="btn btn-outline-warning"
                  @click="closeModal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  class="btn btn-light"
                  :disabled="isLoading"
                >
                  {{ task ? 'Update' : 'Save' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
