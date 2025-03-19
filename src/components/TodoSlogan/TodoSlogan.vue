<template>
  <div class="d-flex flex-column-reverse justify-content-center min-vh-100">
    <div
      class="d-flex align-items-center justify-content-center flex-column mt-3"
    >
      <img src="@/assets/logo-app-todo.png" alt="Logo TodoApp" width="150" />
      <h1>TodoApp</h1>
      <h2 class="text-center">O App que te ajuda resolver suas tarefas!</h2>
    </div>
    <slot />
  </div>
</template>
