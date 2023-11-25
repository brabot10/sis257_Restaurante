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

async function crearPedido() {
  await http
    .post(ENDPOINT, {
      nombreC: nombreC.value,
      direccion: direccion.value,
      nombreProducto: nombreProducto.value,
      cantidad: cantidad.value,
      fechaPedido: fechaPedido.value,
      idRepartidor: idRepartidor.value
    })
    .then(() => router.push('/pedido'))
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
        <li class="breadcrumb-item">
          <RouterLink to="/">Inicio</RouterLink>
        </li>
        <li class="breadcrumb-item">
          <RouterLink to="/pedido">Pedido</RouterLink>
        </li>
        <li class="breadcrumb-item active" aria-current="page" style="color: black">Crear Pedido</li>
      </ol>
    </nav>

    <div class="row">
      <h2>Crear Nuevo Pedido</h2>
    </div>

    <div class="row">
      <form @submit.prevent="crearPedido">
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            v-model="direccion"
            placeholder="direccion"
            required
          />
          <label for="direccion">Direccion</label>
        </div>
        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            v-model="nombreProducto"
            placeholder="nombreProducto"
            required
          />
          <label for="nombreProducto">Nombre del producto</label>
        </div>

        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            v-model="nombreC"
            placeholder="nombreC"
            required
          />
          <label for="nombreC">Nombre Cliente</label>
        </div>

        <div class="form-floating">
          <input
            type="number"
            class="form-control"
            v-model="cantidad"
            placeholder="cantidad"
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
          <label for="repartidor">Nombre del Repartidor</label>
        </div>

        <div class="text-center mt-3">
          <button type="submit" class="btn btn-primary btn-lg">
            <font-awesome-icon icon="fa-solid fa-floppy-disk" /> Crear Pedido
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
