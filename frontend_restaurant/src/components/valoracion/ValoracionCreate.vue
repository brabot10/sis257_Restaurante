<script setup lang="ts">
import { ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'
//import type { Pedido } from '@/models/pedido'

const props = defineProps<{
  ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
//const pedido = ref<Pedido[]>([])
const descripcion = ref('')
const idPlatillo = ref('')
const idRepartidor = ref('')

async function crearValoracion() {
  await http
    .post(ENDPOINT, {
      descripcion: descripcion.value,
      idPlatillo: idPlatillo.value,
      idRepartidor: idRepartidor.value
    })
    .then(() => router.push('/valoraciones'))
}

function goBack() {
  router.go(-1)
}
</script>

<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/">Inicio</RouterLink></li>
        <li class="breadcrumb-item">
          <RouterLink to="/valoraciones">Valoraciones</RouterLink>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Crear</li>
      </ol>
    </nav>

    <div class="row">
      <h2>Crear Nuevo Valoración</h2>
    </div>

    <div class="row">
      <form @submit.prevent="crearValoracion">
        <!--cuando yo aprete guardar me llma al metodo crearValoracion-->
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
            <font-awesome-icon icon="fa-solid fa-floppy-disk" /> Crear
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
