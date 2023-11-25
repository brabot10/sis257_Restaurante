<script setup lang="ts">
import type { Repartidor } from '@/models/repartidor'
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'

const props = defineProps<{
  //esto se copia 7-11
  ENDPOINT_API: string //variable que vien del view/repartidor
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
var repartidores = ref<Repartidor[]>([]) //creamos la variable plural quie tomara loscalores de models/repartidores

async function getRepartidor() {
  repartidores.value = await http.get(ENDPOINT).then((response) => response.data) //para listar hace get del backend
}

function toEdit(id: number) {
  router.push(`/repartidor/editar/${id}`) //me direcciona a la url delswagger depath
}

async function toDelete(id: number) {
  var r = confirm('¿Está seguro que se desea eliminar el repartidor?')
  if (r == true) {
    await http.delete(`${ENDPOINT}/${id}`).then(() => getRepartidor())
  }
}

onMounted(() => {
  getRepartidor() //esto me llama para que cuando yo entre a repartidores me muestre los datos
})
</script>

<template>
  <br /><br /><br />
  <div class="container">
    <!--div general con bootstrap con diseño-->
    <nav aria-label="breadcrumb">
      <!--//clase propias de botstrap-->
      <ol class="breadcrumb">
        <!--//clase propias de botstrap-->
        <li class="breadcrumb-item"><RouterLink to="/">Inicio</RouterLink></li>
        <!--//clase propias de botstrap-->
        <li class="breadcrumb-item active" aria-current="page" style="color: black">Repartidor</li>
        <!--//clase propias de botstrap-->
      </ol>
    </nav>

    <div class="row">
      <h2>Lista de Repartidores</h2>
      <div class="col-12">
        <RouterLink to="/repartidor/crear"
          ><!--Enlace deswwgaer para crear-->
          <font-awesome-icon icon="fa-solid fa-plus" />Crear Nuevo Repartidor<!--implmetacion del icono-->
        </RouterLink>
      </div>
    </div>

    <div class="table-responsive">
      <!--tablas propias de bottstrap-->
      <table class="table table-bordered">
        <thead>
          <tr style="background-color: black">
            <th scope="col" style="color: #e49e48">N°</th>
            <th scope="col" style="color: #e49e48"> Registro de Repartidores</th>
            <th scope="col" style="color: #e49e48">Nombre del Repartidor</th>
            <th scope="col" style="color: #e49e48">Carnet</th>
            <th scope="col" style="color: #e49e48">Edad</th>
            <th scope="col" style="color: #e49e48">Editar/Eliminar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(repartidor, index) in repartidores" :key="repartidor.id" style="background-color: black">
            <!--el singular solo es una variable-->
            <th scope="row" style="color: #f8cb2e">{{ index + 1 }}</th>
            <!--cuando el intex comienza en 0 le damos mas 1-->
            <td align="center" style="color: #f8cb2e">{{ repartidor.id }}</td>
            <td style="color: #f8cb2e">{{ repartidor.nombreR }}</td>
            <td style="color: #f8cb2e">{{ repartidor.carnet }}</td>
            <td style="color: #f8cb2e">{{ repartidor.edad }}</td>
            <td>
              <button class="btn text-success" @click="toEdit(repartidor.id)">
                <font-awesome-icon icon="fa-solid fa-edit" />
              </button>
              <button class="btn text-danger" @click="toDelete(repartidor.id)">
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
