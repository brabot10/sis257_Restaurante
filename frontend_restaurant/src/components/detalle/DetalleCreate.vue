<script setup lang="ts">
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'
import type { Pedido } from '@/models/pedido'

var pedido = ref<Pedido[]>([])
async function getPedidos() {
  pedido.value = await http.get('pedido').then((response) => response.data)// del  view
}

onMounted(() => {
  getPedidos()
})
const props = defineProps<{
  ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
const direccionEstado = ref('')
const puntuacion = ref('')
const credibilidad = ref('')
const amabilidad = ref('')
const idPedido = ref('')

async function crearDetalle() {
  await http
    .post(ENDPOINT, {
      direccionEstado: direccionEstado.value,
      puntuacion: puntuacion.value,
      credibilidad: credibilidad.value,
      amabilidad: amabilidad.value,
      idPedido: idPedido.value
    })
    .then(() => router.push('/detalles'))
}

function goBack() {
  router.go(-1)
}
</script>

<template>
  <br /><br /><br />
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/">Inicio</RouterLink></li>
        <li class="breadcrumb-item">
          <RouterLink to="/detalles">Detalles</RouterLink>
        </li>
        <li class="breadcrumb-item active" aria-current="page" style="color: black">
          Crear Detalle
        </li>
      </ol>
    </nav>

    <div class="row">
      <h2>Crear Nuevo Detalle de Pedido</h2>
    </div>

    <div class="row">
      <form @submit.prevent="crearDetalle">
        <!--cuando yo aprete guardar me llma al metodo crearDetalle-->
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            v-model="direccionEstado"
            placeholder="DireccionEstado"
            required
          />
          <label for="direccionEstado">Estado de la Dirección</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            v-model="puntuacion"
            placeholder="Puntuacion"
            required
          />
          <label for="puntuacion">Puntuación</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            v-model="credibilidad"
            placeholder="Credibilidad"
            required
          />
          <label for="credibilidad">Credibilidad</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            v-model="amabilidad"
            placeholder="Amabilidad"
            required
          />
          <label for="amabilidad">Amabilidad</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="number"
            class="form-control"
            v-model="idPedido"
            placeholder="idPedido"
            required
          />
          <label for="idPedido">idPedido</label>
        </div>

        <div class="form-floating mb-3">
          <select v-model="idPedido" class="form-select">
            <option v-for="pedidos in pedido" :value="pedidos.id">
              {{ pedidos.nombreC }}
            </option>
          </select>
          <label for="pedidos">Nombre del Cliente</label>
        </div>

        <div class="text-center mt-3">
          <button type="submit" class="btn btn-primary btn-lg">
            <font-awesome-icon icon="fa-solid fa-floppy-disk" /> Crear Detalle
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
