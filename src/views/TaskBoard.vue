<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import service from '@/services'

const date = ref(new Date())
const name = ref('')
const router = useRouter()

const fetchUser = async () => {
  try {
    const response = await service.user.findAutenticatedUser()
    name.value = response.user.name
  } catch (error) {
    console.error('Erro ao buscar usuário:', error)
  }
}

const fetchTasks = async () => {
  try {
    const response = await service.task.findAll()
    console.log(response)
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error)
  }
}

const logoutUser = async () => {
  try {
    await axios.post(
      'api/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`
        }
      }
    )
    localStorage.removeItem('auth_token')
    alert('Logout realizado com sucesso!')
    router.push('/login')
  } catch (error) {
    alert('Erro ao fazer logout: ' + error)
  }
}

onMounted(() => {
  fetchUser()
})
</script>
<template>
  <div class="d-flex flex-column justify-content- align-items-center">
    <div
      class="d-flex flex-column justify-content-center align-items-center mb-5"
    >
      <h2>Bem vindo, {{ name.toLocaleUpperCase() }}</h2>
      <h3>Não deixe para amanhã o que pode fazer hoje!</h3>
    </div>

    <div class="card text-bg-dark mb-3 border border-light p-3">
      <div class="card-header text-center">
        <div>
          <h4>Tarefas</h4>
          <button @click="createTask" class="btn btn-light">Nova</button>
        </div>
        <VDatePicker v-model="date" :popover="false">
          <template #default="{ togglePopover, inputValue, inputEvents }">
            <div>
              <button @click="() => togglePopover()">
                <i class="bi bi-calendar-event-fill"></i>
              </button>
              <input :value="inputValue" v-on="inputEvents" />
            </div>
          </template>
        </VDatePicker>
      </div>
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
</template>
