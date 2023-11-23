<script setup lang="ts">
import type { Platillo } from '@/models/platillo'
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'

const props = defineProps<{//esto se copia 7-11
  ENDPOINT_API: string//variable que vien del view/platillo
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
var platillos = ref<Platillo[]>([])//creamos la variable plural quie tomara loscalores de models/platillos

async function getPlatillos() {
  platillos.value = await http.get(ENDPOINT).then(
    (response) => response.data)//para listar hace get del backend
}

function toEdit(id: number) {
  router.push(`/platillos/editar/${id}`)//me direcciona a la url delswagger depath
}

async function toDelete(id: number) {
  var r = confirm('¿Está seguro que se desea eliminar el platillo?')
  if (r == true) {
    await http.delete(`${ENDPOINT}/${id}`).then(() => getPlatillos())
  }
}

onMounted(() => {
  getPlatillos()//esto me llama para que cuando yo entre a platillos me muestre los datos
})
</script>

<template>
  <div class="container"><!--div general con bootstrap con diseño-->
    <nav aria-label="breadcrumb"><!--//clase propias de botstrap-->
      <ol class="breadcrumb"><!--//clase propias de botstrap-->
        <li class="breadcrumb-item"><RouterLink to="/">Inicio</RouterLink></li><!--//clase propias de botstrap-->
        <li class="breadcrumb-item active" aria-current="page">Platillo</li><!--//clase propias de botstrap--> 
      </ol>
    </nav>

    <div class="row">
      <h2>Lista de Platillos</h2>
      <div class="col-12">
        <RouterLink to="/platillos/crear"><!--Enlace deswwgaer para crear-->
          <font-awesome-icon icon="fa-solid fa-plus" />Crear Nuevo Platillo<!--implmetacion del icono-->
        </RouterLink>
      </div>
    </div>

    <div class="table-responsive"><!--tablas propias de bottstrap-->
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">N°</th>
            <th scope="col">Nombre del Platillo</th>
            <th scope="col">Precio</th>
            <th scope="col">IdPedido</th> 
            <th scope="col">Editar/Cancelar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(platillo, index) in platillos" :key="platillo.id"><!--el singular solo es una variable-->
            <th scope="row">{{ index + 1 }}</th><!--cuando el intex comienza en 0 le damos mas 1-->
            <td>{{ platillo.nombre }}</td>
            <td>{{ platillo.precio }}</td>
            <td>{{ platillo.idPedido }}</td>
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