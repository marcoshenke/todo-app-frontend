<script setup>
import { useForm, useField, Field, Form, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

import services from '@/services'

const schema = yup.object({
  title: yup.string().required('O título é obrigatório'),
  description: yup.string(),
  task_date: yup.date().nullable().typeError('Data inválida')
})

const { value: title } = useField('title')
const { value: description } = useField('description')
const { value: task_date } = useField('task_date')

const { handleSubmit, resetForm } = useForm({
  validationSchema: schema
})

const onSubmit = handleSubmit(async (formValues) => {
  try {
    const paramsFormated = {
      title: formValues.title,
      description: formValues.description,
      task_date: formValues.task_date ? new Date(formValues.task_date) : null
    }
    await services.tasks.create(paramsFormated)
    resetForm()
  } catch (error) {
    console.error('Erro ao criar tarefa:', error)
  }
})
</script>
<template>
  <div class="py-2">
    <div class="modal" id="createTaskModal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content bg-dark p-3">
          <div class="modal-header">
            <h5 class="modal-title">Criar tarefa</h5>
          </div>
          <div class="modal-body">
            <form @submit.prevent="onSubmit">
              <div class="mb-3">
                <label for="description" class="form-label">Título</label>
                <Field
                  name="title"
                  type="text"
                  v-model="title"
                  class="form-control"
                />
                <ErrorMessage name="title" class="text-danger" />
              </div>

              <div class="mb-3">
                <label for="description" class="form-label">Descrição</label>
                <Field
                  name="description"
                  type="text"
                  v-model="description"
                  class="form-control"
                  as="textarea"
                />
              </div>

              <div class="mb-3">
                <label for="task_date" class="form-label">Data da Tarefa</label>
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
                >
                  Fechar
                </button>
                <button type="submit" class="btn btn-light">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
