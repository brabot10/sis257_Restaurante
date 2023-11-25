<script setup lang="ts">
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'
import type { Repartidor } from '@/models/repartidor'
import type { Platillo } from '@/models/platillo'

var platillos = ref<Platillo[]>([])
async function getPlatillo() {
  platillos.value = await http.get('platillos').then((response) => response.data)
}

onMounted(() => {
  getPlatillo()
})
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
  <br /><br /><br />
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/">Inicio</RouterLink></li>
        <li class="breadcrumb-item">
          <RouterLink to="/valoraciones">Valoraciones</RouterLink>
        </li>
        <li class="breadcrumb-item active" aria-current="page" style="color: black">Crear Valoración</li>
      </ol>
    </nav>

    <div class="row">
      <h2>Crear Nueva Valoración</h2>
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
          <select v-model="idPlatillo" class="form-select">
            <option v-for="platillo in platillos" :value="platillo.id">
              {{ platillo.nombre }}
            </option>
          </select>
          <label for="platillo">Nombre del Platillo</label>
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
            <font-awesome-icon icon="fa-solid fa-floppy-disk" /> Crear Valoración
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
