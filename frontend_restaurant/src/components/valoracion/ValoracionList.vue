<script setup lang="ts">
import type { Valoracion } from '@/models/valoracion'
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'

const props = defineProps<{
  //esto se copia 7-11
  ENDPOINT_API: string //variable que vien del view/valoracion
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
var valoraciones = ref<Valoracion[]>([]) //creamos la variable plural quie tomara loscalores de models/valoraciones

async function getValoracions() {
  valoraciones.value = await http.get(ENDPOINT).then((response) => response.data) //para listar hace get del backend
}

function toEdit(id: number) {
  router.push(`/valoraciones/editar/${id}`) //me direcciona a la url delswagger depath
}

async function toDelete(id: number) {
  var r = confirm('¿Está seguro que se desea eliminar la valoración?')
  if (r == true) {
    await http.delete(`${ENDPOINT}/${id}`).then(() => getValoracions())
  }
}

onMounted(() => {
  getValoracions() //esto me llama para que cuando yo entre a valoraciones me muestre los datos
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
        <li class="breadcrumb-item active" aria-current="page" style="color: black">Valoracion</li>
        <!--//clase propias de botstrap-->
      </ol>
    </nav>

    <div class="row">
      <h2>Lista de Valoraciones</h2>
      <div class="col-12">
        <RouterLink to="/valoraciones/crear"
          ><!--Enlace deswwgaer para crear-->
          <font-awesome-icon icon="fa-solid fa-plus" />Crear Nueva Valoracion<!--implmetacion del icono-->
        </RouterLink>
      </div>
    </div>

    <div class="table-responsive">
      <!--tablas propias de bottstrap-->
      <table class="table table-bordered">
        <thead>
          <tr style="background-color: black">
            <th scope="col" style="color: #e49e48">N°</th>
            <th scope="col" style="color: #e49e48">Registro de la Valoración</th>
            <th scope="col" style="color: #e49e48">Nombre del Platillo</th>
            <th scope="col" style="color: #e49e48">Nombre del Repartidor</th>
            <th scope="col" style="color: #e49e48">Descripción</th>
            <th scope="col" style="color: #E49E48">Editar/Eliminar</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(valoracion, index) in valoraciones"
            :key="valoracion.id"
            style="background-color: black"
          >
            <!--el singular solo es una variable-->
            <th scope="row" style="color: #f8cb2e">{{ index + 1 }}</th>
            <!--cuando el intex comienza en 0 le damos mas 1-->
            <td align="center" style="color: #f8cb2e">{{ valoracion.id }}</td>
            <td style="color: #f8cb2e">{{ valoracion.platillos.nombre }}</td>
            <td style="color: #f8cb2e">{{ valoracion.repartidor.nombreR }}</td>
            <td style="color: #f8cb2e">{{ valoracion.descripcion }}</td>

            <td>
              <button class="btn text-success" @click="toEdit(valoracion.id)">
                <font-awesome-icon icon="fa-solid fa-edit" />
              </button>
              <button class="btn text-danger" @click="toDelete(valoracion.id)">
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
