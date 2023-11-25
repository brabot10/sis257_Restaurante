<script setup lang="ts">
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'
import type { Repartidor } from '@/models/repartidor'

var repartidores = ref<Repartidor[]>([])
async function getRepartidor() {
  repartidores.value = await http.get('repartidor').then((response) => response.data)
}

onMounted(() => {
  getRepartidor()
})
const props = defineProps<{
  ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
const mes = ref('')
const tiempoExtra = ref('')
const total = ref('')
const idRepartidor = ref('')
const id = router.currentRoute.value.params['id']

async function editarPlatillo() {
  await http
    .patch(`${ENDPOINT}/${id}`, {
      mes: mes.value,
      tiempoExtra: tiempoExtra.value,
      total: total.value,
      idRepartidor: idRepartidor.value
    })
    .then(() => router.push('/pago'))
}

async function getPlatillo() {
  await http.get(`${ENDPOINT}/${id}`).then((response) => {
    ;(mes.value = response.data.mes),
      (tiempoExtra.value = response.data.tiempoExtra),
      (total.value = response.data.total),
      (idRepartidor.value = response.data.idRepartidor)
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
      <br><br><br>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/">Inicio</RouterLink></li>
        <li class="breadcrumb-item">
          <RouterLink to="/pago">Pago</RouterLink>
        </li>
        <li class="breadcrumb-item active" aria-current="page" style="color: black">Editar Registro de Pagos</li>
      </ol>
    </nav>


    <div class="row">
      <h2>Editar Registro de Pagos</h2>
    </div>

    <div class="row">
      <form @submit.prevent="editarPlatillo">
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
          <label for="total">Total</label>
        </div>
        <div class="form-floating mb-3">
          <select v-model="idRepartidor" class="form-select">
            <option v-for="repartidor in repartidores" :value="repartidor.id">
              {{ repartidor.nombreR }}
            </option>
          </select>
          <label for="repartidor"> Nombre del Repartidor</label>
        </div>
        <div class="text-center mt-3">
          <button type="submit" class="btn btn-primary btn-lg">
            <font-awesome-icon icon="fa-solid fa-floppy-disk" /> Guardar Registro
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
