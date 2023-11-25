<script setup lang="ts">
import type { Pago } from '@/models/pago'
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'

const props = defineProps<{
  //esto se copia 7-11
  ENDPOINT_API: string //variable que vien del view/pago
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
var pagos = ref<Pago[]>([]) //creamos la variable plural quie tomara loscalores de models/pago

async function getPagos() {
  pagos.value = await http.get(ENDPOINT).then((response) => response.data) //para listar hace get del backend
}

function toEdit(id: number) {
  router.push(`/pago/editar/${id}`) //me direcciona a la url delswagger depath
}

async function toDelete(id: number) {
  var r = confirm('¿Está seguro que se desea eliminar el pago?')
  if (r == true) {
    await http.delete(`${ENDPOINT}/${id}`).then(() => getPagos())
  }
}

onMounted(() => {
  getPagos() //esto me llama para que cuando yo entre a pago me muestre los datos
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
        <li class="breadcrumb-item active" aria-current="page" style="color: black">Pago</li>
        <!--//clase propias de botstrap-->
      </ol>
    </nav>

    <div class="row">
      <h2>Lista de Pagos</h2>
      <div class="col-12">
        <RouterLink to="/pago/crear"
          ><!--Enlace deswwgaer para crear-->
          <font-awesome-icon icon="fa-solid fa-plus" />Crear Nuevo Pago<!--implmetacion del icono-->
        </RouterLink>
      </div>
    </div>

    <div class="table-responsive">
      <!--tablas propias de bottstrap-->
      <table class="table table-bordered">
        <thead>
          <tr style="background-color: black">
            <th scope="col" style="color: #e49e48">N°</th>
            <th scope="col" style="color: #e49e48">Orden del Registro</th>
            <th scope="col" style="color: #e49e48">Nombre del Repartidor</th>
            <th scope="col" style="color: #e49e48">Mes</th>
            <th scope="col" style="color: #e49e48">Tiempo Extra</th>
            <th scope="col" style="color: #e49e48">Total</th>
            <th scope="col" style="color: #e49e48">Editar/Eliminar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(pago, index) in pagos" :key="pago.id" style="background-color: black">
            <!--el singular solo es una variable-->
            <th scope="row" style="color: #f8cb2e">{{ index + 1 }}</th>
            <!--cuando el intex comienza en 0 le damos mas 1-->
            <td align="center" style="color: #f8cb2e">{{ pago.id }}</td>
            <td style="color: #f8cb2e">{{ pago.repartidor.nombreR }}</td>
            <td style="color: #f8cb2e">{{ pago.mes }}</td>
            <td style="color: #f8cb2e">{{ pago.tiempoExtra }}</td>
            <td style="color: #f8cb2e">{{ pago.total }}</td>

            <td>
              <button class="btn text-success" @click="toEdit(pago.id)">
                <font-awesome-icon icon="fa-solid fa-edit" />
              </button>
              <button class="btn text-danger" @click="toDelete(pago.id)">
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
