<script setup lang="ts">
import type { Detalle } from '@/models/detalle'
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'

const props = defineProps<{
  //esto se copia 7-11
  ENDPOINT_API: string //variable que vien del view/detalle
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
var detalles = ref<Detalle[]>([]) //creamos la variable plural quie tomara loscalores de models/detalles

async function getDetalles() {
  detalles.value = await http.get(ENDPOINT).then((response) => response.data) //para listar hace get del backend
}

function toEdit(id: number) {
  router.push(`/detalles/editar/${id}`) //me direcciona a la url delswagger depath
}

async function toDelete(id: number) {
  var r = confirm('¿Está seguro que se desea eliminar el detalle?')
  if (r == true) {
    await http.delete(`${ENDPOINT}/${id}`).then(() => getDetalles())
  }
}

onMounted(() => {
  getDetalles() //esto me llama para que cuando yo entre a detalles me muestre los datos
})
</script>

<template>
  <div class="container">
    <!--div general con bootstrap con diseño-->
    <nav aria-label="breadcrumb">
      <!--//clase propias de botstrap-->
      <ol class="breadcrumb">
        <!--//clase propias de botstrap-->
        <li class="breadcrumb-item"><RouterLink to="/">Inicio</RouterLink></li>
        <!--//clase propias de botstrap-->
        <li class="breadcrumb-item active" aria-current="page">Detalle</li>
        <!--//clase propias de botstrap-->
      </ol>
    </nav>

    <div class="row">
      <h2>Lista de Detalles</h2>
      <div class="col-12">
        <RouterLink to="/detalles/crear"
          ><!--Enlace deswwgaer para crear-->
          <font-awesome-icon icon="fa-solid fa-plus" />Crear Nuevo Detalle<!--implmetacion del icono-->
        </RouterLink>
      </div>
    </div>

    <div class="table-responsive">
      <!--tablas propias de bottstrap-->
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">N°</th>
            <th scope="col">Estado de la Dirección</th>
            <th scope="col">Puntuación</th>
            <th scope="col">Credibilidad</th>
            <th scope="col">Amabilidad</th>
            <th scope="col">IdPedido</th>
            <th scope="col">Editar/Cancelar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(detalle, index) in detalles" :key="detalle.id">
            <!--el singular solo es una variable-->
            <th scope="row">{{ index + 1 }}</th>
            <!--cuando el intex comienza en 0 le damos mas 1-->
            <td>{{ detalle.direccionEstado }}</td>
            <td>{{ detalle.puntuación }}</td>
            <td>{{ detalle.credibilidad }}</td>
            <td>{{ detalle.amabilidad }}</td>
            <td>{{ detalle.idPedido }}</td>
            <td>
              <button class="btn text-success" @click="toEdit(detalle.id)">
                <font-awesome-icon icon="fa-solid fa-edit" />
              </button>
              <button class="btn text-danger" @click="toDelete(detalle.id)">
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
