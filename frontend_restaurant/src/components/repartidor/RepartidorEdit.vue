<script setup lang="ts">
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'

const props = defineProps<{
  ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
const nombreR = ref('')
const carnet = ref('')
const edad = ref('')
const id = router.currentRoute.value.params['id']

async function editarPlatillo() {
  await http
    .patch(`${ENDPOINT}/${id}`, {
      nombreR: nombreR.value,
      carnet: carnet.value,
      edad: edad.value
    })
    .then(() => router.push('/repartidor'))
}

async function getPlatillo() {
  await http.get(`${ENDPOINT}/${id}`).then((response) => {
    ;(nombreR.value = response.data.nombreR),
      (carnet.value = response.data.carnet),
      (edad.value = response.data.edad)
  })
}

function goBack() {
  router.go(-1)
}

onMounted(() => {
  getPlatillo()
})
</script>

<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/">Inicio</RouterLink></li>
        <li class="breadcrumb-item">
          <RouterLink to="/repartidor">Repartidor</RouterLink>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Editar</li>
      </ol>
    </nav>

    <div class="row">
      <h2>Editar Repartidor</h2>
    </div>

    <div class="row">
      <form @submit.prevent="editarPlatillo">
        <div class="form-floating mb-3">
          <input type="text" class="form-control" v-model="nombreR" placeholder="NombreR" required />
          <label for="nombreR">Nombre</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="number"
            class="form-control"
            v-model="carnet"
            placeholder="Carnet"
            required
          />
          <label for="carnet">Carnet</label>
        </div>
        <div class="form-floating mb-3">
          <input type="number" class="form-control" v-model="edad" placeholder="Edad" required />
          <label for="edad">edad</label>
        </div>
        <div class="text-center mt-3">
          <button type="submit" class="btn btn-primary btn-lg">
            <font-awesome-icon icon="fa-solid fa-floppy-disk" /> Guardar
          </button>
        </div>
      </form>
    </div>
    <div class="text-left">
      <button class="btn btn-link" @click="goBack">Volver</button>
    </div>
  </div>
</template>

<style></style>
