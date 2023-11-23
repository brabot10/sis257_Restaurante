<script setup lang="ts">
import { ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'

const props = defineProps<{
  ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
const mes = ref('')
const tiempoExtra = ref('')
const total = ref('')
const idRepartidor = ref('')

async function crearPago() {
  await http
    .post(ENDPOINT, {
      mes: mes.value,
      tiempoExtra: tiempoExtra.value,
      total: total.value,
      idRepartidor: idRepartidor.value
    })
    .then(() => router.push('/pago'))
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
          <RouterLink to="/pago">Pagos</RouterLink>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Crear</li>
      </ol>
    </nav>

    <div class="row">
      <h2>Crear Nuevo Pago</h2>
    </div>

    <div class="row">
      <form @submit.prevent="crearPago">
        <!--cuando yo aprete guardar me llma al metodo crearPago-->
        <div class="form-floating mb-3">
          <input type="text" class="form-control" v-model="mes" placeholder="Mes" required />
          <label for="mes">Mes</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            v-model="tiempoExtra"
            placeholder="TiempoExtra"
            required
          />
          <label for="tiempoExtra">Tiempo Extra</label>
        </div>
        <div class="form-floating mb-3">
          <input type="number" class="form-control" v-model="total" placeholder="Total" required />
          <label for="total">total</label>
        </div> 
        <div class="form-floating mb-3">
          <input type="number" class="form-control" v-model="idRepartidor" placeholder="IdRepartidor" required />
          <label for="idRepartidor">idRepartidor</label>
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