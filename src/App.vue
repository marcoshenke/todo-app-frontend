<template>
  <router-view v-slot="{ Component, route }">
    <div
      :key="route.name"
      class="d-flex flex-column vh-100 vw-100 bg-dark text-light p-2"
    >
      <Component :is="Component" />
    </div>
  </router-view>
</template>
