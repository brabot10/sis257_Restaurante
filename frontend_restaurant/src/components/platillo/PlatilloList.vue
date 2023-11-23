<script setup lang="ts">
import type { Platillo } from '@/models/platillo'
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'

const props = defineProps<{//esto se copia 7-11
  ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
var platillos = ref<Platillo[]>([])

async function getPlatillos() {
  platillos.value = await http.get(ENDPOINT).then((response) => response.data)
}

function toEdit(id: number) {
  router.push(`/platillos/editar/${id}`)
}

async function toDelete(id: number) {
  var r = confirm('¿Está seguro que se desea eliminar el platillo?')
  if (r == true) {
    await http.delete(`${ENDPOINT}/${id}`).then(() => getPlatillos())
  }
}

onMounted(() => {
  getPlatillos()
})
</script>

<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/">Inicio</RouterLink></li>
        <li class="breadcrumb-item active" aria-current="page">Platillo</li>
      </ol>
    </nav>

    <div class="row">
      <h2>Lista de Platillos</h2>
      <div class="col-12">
        <RouterLink to="/platillos/crear">
          <font-awesome-icon icon="fa-solid fa-plus" />Crear Nuevo Platillo
        </RouterLink>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">N°</th>
            <th scope="col">Nombre del Platillo</th>
            <th scope="col">Precio</th>
            <th scope="col">Editar/Cancelar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(platillo, index) in platillos.values()" :key="platillo.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ platillo.nombre }}</td>
            <td>{{ platillo.precio }}</td>
            <td>{{ }}</td>
            <td>
              <button class="btn text-success" @click="toEdit(platillo.id)">
                <font-awesome-icon icon="fa-solid fa-edit" />
              </button>
              <button class="btn text-danger" @click="toDelete(platillo.id)">
                <font-awesome-icon icon="fa-solid fa-trash" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped></style>