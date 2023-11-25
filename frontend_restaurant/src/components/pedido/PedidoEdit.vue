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
const nombreC = ref('')
const direccion = ref('')
const nombreProducto = ref('')
const cantidad = ref('')
const fechaPedido = ref('')
const idRepartidor = ref('')
const id = router.currentRoute.value.params['id']

async function editarPedido() {
  await http
    .patch(`${ENDPOINT}/${id}`, {
      nombreC: nombreC.value,
      direccion: direccion.value,
      nombreProducto: nombreProducto.value,
      cantidad: cantidad.value,
      fechaPedido: fechaPedido.value,
      idRepartidor: idRepartidor.value
    })
    .then(() => router.push('/pedido'))
}

async function getPedido() {
  await http.get(`${ENDPOINT}/${id}`).then((response) => {
    ;(nombreC.value = response.data.nombreC),
      (direccion.value = response.data.direccion),
      (nombreProducto.value = response.data.nombreProducto),
      (cantidad.value = response.data.cantidad),
      (fechaPedido.value = response.data.fechaPedido),
      (idRepartidor.value = response.data.idRepartidor)
  })
}

function goBack() {
  router.go(-1)
}

onMounted(() => {
  getPedido()
})
</script>

<template>
  <br /><br /><br />
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <RouterLink to="/">Inicio</RouterLink>
        </li>
        <li class="breadcrumb-item">
          <RouterLink to="/pedido">Pedidos</RouterLink>
        </li>
        <li class="breadcrumb-item active" aria-current="page" style="color: black">Editar Pedido</li>
      </ol>
    </nav>

    <div class="row">
      <h2>Editar Pedido</h2>
    </div>

    <div class="row">
      <form @submit.prevent="editarPedido">
        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            v-model="nombreC"
            placeholder="NombreC"
            required
          />
          <label for="nombreC">Nombre Cliente</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            v-model="direccion"
            placeholder="Direccion"
            required
          />
          <label for="direccion">Direccion</label>
        </div>
        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            v-model="nombreProducto"
            placeholder="Nombre del pedido"
            required
          />
          <label for="nombreProducto">Nombre del Pedido</label>
        </div>

        <div class="form-floating">
          <input
            type="number"
            class="form-control"
            v-model="cantidad"
            placeholder="Cantidad"
            required
          />
          <label for="cantidad">Cantidad</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="date"
            class="form-control"
            v-model="fechaPedido"
            placeholder="fechaPedido"
            required
          />
          <label for="fechaPedido">fecha del Pedido</label>
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
            <font-awesome-icon icon="fa-solid fa-floppy-disk" /> Guardar Pedido
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
