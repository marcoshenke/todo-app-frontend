<script setup>
import { ref } from 'vue'
import { Toast } from 'bootstrap'

const toastMessage = ref('') // Mensagem do Toast

// Função para exibir o Toast
const showToast = (message) => {
  toastMessage.value = message
  const toastElement = document.getElementById('snackbarToast')
  const toastInstance = Toast.getOrCreateInstance(toastElement)
  toastInstance.show()
}
</script>
<template>
  <div>
    <!-- Toast Container -->
    <div
      class="toast-container position-fixed bottom-0 end-0 p-3"
      style="z-index: 1055"
    >
      <div
        id="snackbarToast"
        class="toast align-items-center text-bg-primary border-0"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div class="d-flex">
          <div class="toast-body">
            {{ toastMessage }}
          </div>
          <button
            type="button"
            class="btn-close btn-close-white me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
      </div>
    </div>
  </div>
</template>
