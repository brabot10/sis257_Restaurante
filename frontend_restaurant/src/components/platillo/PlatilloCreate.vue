<script setup lang="ts">
// import { onMounted, ref } from 'vue'
import { ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'
// import type { Pedido } from '@/models/pedido'

// var pedido = ref<Pedido[]>([])
// async function getPedidos() {
//   pedido.value = await http.get('pedido').then((response) => response.data) // del  view
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

async function crearPlatillo() {
  await http
    .post(ENDPOINT, {
      nombre: nombre.value,
      urlPlatillo: urlPlatillo.value,
      precio: precio.value,
      tiempoPraparacion: tiempoPraparacion.value,
      disponibilidad: disponibilidad.value
    })
    .then(() => router.push('/platillos'))
}

function goBack() {
  router.go(-1)
}
</script>

<template>
  <br /><br /><br />
  <div class="container">
    <div class="find-us">
      <div class="row">
        <div class="col-md-12">
          <div class="section-heading">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <RouterLink to="/">Inicio</RouterLink>
                </li>
                <li class="breadcrumb-item">
                  <RouterLink to="/platillos">Platillos</RouterLink>
                </li>
                <li class="breadcrumb-item active" aria-current="page">Crear</li>
              </ol>
            </nav>
            <h2>INSERTAR DATOS DEL PLATILLO</h2>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <form @submit.prevent="crearPlatillo">
        <!--cuando yo aprete guardar me llma al metodo crearPlatillo-->
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
            <font-awesome-icon icon="fa-solid fa-floppy-disk" /> Crear Platillo
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
