<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  task: Object
})
</script>

<template>
  <div class="py-2">
    <div class="modal" id="viewTaskModal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content bg-dark p-3">
          <div class="modal-header">
            <h4 class="modal-title">View Task</h4>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Title</label>
              <input
                type="text"
                class="form-control"
                :value="task?.title"
                readonly
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Descrição</label>
              <textarea
                class="form-control"
                :value="task?.description"
                readonly
              ></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-warning"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
