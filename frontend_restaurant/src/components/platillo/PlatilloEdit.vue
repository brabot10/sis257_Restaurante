<script setup lang="ts">
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'
// import type { Pedido } from '@/models/pedido'

// var pedido = ref<Pedido[]>([])
// async function getPedidos() {
//   pedido.value = await http.get('pedido').then((response) => response.data)
// }

// onMounted(() => {
//   getPedidos()
// })

const props = defineProps<{
  ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
const nombre = ref('')
const urlPlatillo = ref('')
const precio = ref('')
const tiempoPraparacion = ref('')
const disponibilidad = ref('')
const id = router.currentRoute.value.params['id']

async function editarPlatillo() {
  await http
    .patch(`${ENDPOINT}/${id}`, {
      nombre: nombre.value,
      urlPlatillo: urlPlatillo.value,
      precio: precio.value,
      tiempoPraparacion: tiempoPraparacion.value,
      disponibilidad: disponibilidad.value
    })
    .then(() => router.push('/platillos'))
}

async function getPlatillo() {
  await http.get(`${ENDPOINT}/${id}`).then((response) => {
    ;(nombre.value = response.data.nombre),
      (urlPlatillo.value = response.data.urlPlatillo),
      (precio.value = response.data.precio),
      (tiempoPraparacion.value = response.data.tiempoPraparacion),
      (disponibilidad.value = response.data.disponibilidad)
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
  <br /><br /><br />
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <RouterLink to="/">Inicio</RouterLink>
        </li>
        <li class="breadcrumb-item">
          <RouterLink to="/platillos">Platillos</RouterLink>
        </li>
        <li class="breadcrumb-item active" aria-current="page" style="color: black">
          Editar Platillo
        </li>
      </ol>
    </nav>
    <div class="find-us">
      <div class="row">
        <div class="col-md-12">
          <div class="section-heading">
            <h2>EDITAR DATOS DEL PLATILLO</h2>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <form @submit.prevent="editarPlatillo">
        <div class="form-floating mb-3">
          <input type="text" class="form-control" v-model="nombre" placeholder="Nombre" required />
          <label for="nombre">Nombre</label>
        </div>
        <div class="form-floating mb-3">
          <input type="text" class="form-control" v-model="urlPlatillo" placeholder="urlPlatillo" required />
          <label for="urlPlatillo">Url Platillo</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="number"
            class="form-control"
            v-model="precio"
            placeholder="Precio"
            required
          />
          <label for="precio">Precio</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="number"
            class="form-control"
            v-model="tiempoPraparacion"
            placeholder="tiempoPraparacion"
            required
          />
          <label for="tiempoPraparacion">Tiempo de Preparación</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="number"
            class="form-control"
            v-model="disponibilidad"
            placeholder="disponibilidad"
            required
          />
          <label for="disponibilidad">Disponibilidad</label>
        </div>
        <div class="text-center mt-3">
          <button type="submit" class="btn btn-primary btn-lg">
            <font-awesome-icon icon="fa-solid fa-floppy-disk" /> Guardar
          </button>
        </div>
      </form>
    </div>
    <div class="text-left">
      <button class="btn btn-success" @click="goBack">Volver</button>
    </div>
  </div>
</template>

<style></style>
