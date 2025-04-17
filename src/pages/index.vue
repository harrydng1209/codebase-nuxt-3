<script setup lang="ts">
import { ERole } from '@/models/enums/auth.enum';

definePageMeta({
  layout: 'default',
  middleware: 'auth-middleware',
  requiresAuth: true,
  roles: [ERole.Admin, ERole.Moderator, ERole.SuperAdmin, ERole.User],
  title: 'Home',
});
</script>

<template>
  <div>Codebase Nuxt</div>
</template>
