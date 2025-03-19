<script setup>
import { watch } from 'vue'
import { useForm, useField, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

import services from '@/services'

const emit = defineEmits(['fetchTasksByDate', 'closeTaskModal'])

const props = defineProps({
  task: Object,
  task_date: String
})

const schema = yup.object({
  title: yup.string().max(50).required('O título é obrigatório'),
  description: yup.string(),
  task_date: yup.date().nullable().typeError('Data inválida')
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

const onSubmit = handleSubmit(async (formValues) => {
  try {
    const paramsFormated = {
      title: formValues.title,
      description: formValues.description,
      task_date: formValues.task_date ? new Date(formValues.task_date) : null
    }

    if (props.task) {
      await services.tasks.update(props.task.id, paramsFormated)
    } else {
      await services.tasks.create(paramsFormated)
    }

    emit('fetchTasksByDate', formValues.task_date)
    closeModal()
  } catch (error) {
    console.error('Erro ao salvar tarefa:', error)
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
    } else {
      resetForm()
      setValues({
        title: '',
        description: '',
        task_date: new Date().toISOString().split('T')[0]
      })
    }
  },
  { immediate: true }
)
</script>

<template>
  <div class="py-2">
    <div class="modal" id="ManageTaskModal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content bg-dark p-3">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ task ? 'Editar Tarefa' : 'Criar Tarefa' }}
            </h5>
          </div>
          <div class="modal-body">
            <form @submit.prevent="onSubmit">
              <div class="mb-3">
                <label class="form-label">Título</label>
                <Field
                  name="title"
                  type="text"
                  v-model="title"
                  class="form-control"
                />
                <ErrorMessage name="title" class="text-danger" />
              </div>

              <div class="mb-3">
                <label class="form-label">Descrição</label>
                <Field
                  name="description"
                  type="text"
                  v-model="description"
                  class="form-control"
                  as="textarea"
                />
              </div>

              <div class="mb-3">
                <label class="form-label">Data da Tarefa</label>
                <Field
                  name="task_date"
                  type="date"
                  v-model="task_date"
                  class="form-control"
                />
                <ErrorMessage name="task_date" class="text-danger" />
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-outline-warning"
                  data-bs-dismiss="modal"
                  @click="closeModal"
                >
                  Fechar
                </button>
                <button
                  type="submit"
                  class="btn btn-light"
                  data-bs-dismiss="modal"
                >
                  {{ task ? 'Atualizar' : 'Salvar' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
