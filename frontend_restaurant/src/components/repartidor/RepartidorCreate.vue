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
const nombreR = ref('')
const carnet = ref('')
const edad = ref('')

async function crearRepartidor() {
  await http
    .post(ENDPOINT, {
      nombreR: nombreR.value,
      carnet: carnet.value,
      edad: edad.value
    })
    .then(() => router.push('/repartidor'))
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
          <RouterLink to="/repartidor">Repartidores</RouterLink>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Crear</li>
      </ol>
    </nav>

    <div class="row">
      <h2>Crear Nuevo Repartidor</h2>
    </div>

    <div class="row">
      <form @submit.prevent="crearRepartidor">
        <!--cuando yo aprete guardar me llma al metodo crearRepartidor-->
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