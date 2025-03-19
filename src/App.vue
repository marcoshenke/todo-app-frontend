<template>
  <router-view v-slot="{ Component, route }">
    <div
      :key="route.name"
      class="d-flex flex-column bg-dark text-light min-vh-100"
    >
      <Component :is="Component" />
    </div>
  </router-view>
</template>
