<script setup lang="ts">
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'

const props = defineProps<{
  ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
const descripcion = ref('')
const idPlatillo = ref('')
const idRepartidor = ref('')
const id = router.currentRoute.value.params['id']

async function editarValoracion() {
  await http
    .patch(`${ENDPOINT}/${id}`, {
      descripcion: descripcion.value,
      idPlatillo: idPlatillo.value,
      idRepartidor: idRepartidor.value
    })
    .then(() => router.push('/valoraciones'))
}

async function getValoracion() {
  await http.get(`${ENDPOINT}/${id}`).then((response) => {
    ;(descripcion.value = response.data.descripcion),
      (idPlatillo.value = response.data.idPlatillo),
      (idRepartidor.value = response.data.idRepartidor)
  })
}

function goBack() {
  router.go(-1)
}

onMounted(() => {
  getValoracion()
})
</script>

<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/">Inicio</RouterLink></li>
        <li class="breadcrumb-item">
          <RouterLink to="/valoraciones">Valoraciones</RouterLink>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Editar</li>
      </ol>
    </nav>

    <div class="row">
      <h2>Editar Valoraciones</h2>
    </div>

    <div class="row">
      <form @submit.prevent="editarValoracion">
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            v-model="descripcion"
            placeholder="Descripcion"
            required
          />
          <label for="descripcion">Descripción</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="number"
            class="form-control"
            v-model="idPlatillo"
            placeholder="IdPlatillo"
            required
          />
          <label for="idPlatillo">IdPlatillo</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="number"
            class="form-control"
            v-model="idRepartidor"
            placeholder="IdRepartidor"
            required
          />
          <label for="idRepartidor">IdRepartidor</label>
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
