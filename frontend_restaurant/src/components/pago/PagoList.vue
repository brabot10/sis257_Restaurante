<script setup lang="ts">
import type { Pago } from '@/models/pago'
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'

const props = defineProps<{//esto se copia 7-11
  ENDPOINT_API: string//variable que vien del view/pago
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
var pagos = ref<Pago[]>([])//creamos la variable plural quie tomara loscalores de models/pago

async function getPagos() {
  pagos.value = await http.get(ENDPOINT).then(
    (response) => response.data)//para listar hace get del backend
}

function toEdit(id: number) {
  router.push(`/pago/editar/${id}`)//me direcciona a la url delswagger depath
}

async function toDelete(id: number) {
  var r = confirm('¿Está seguro que se desea eliminar el pago?')
  if (r == true) {
    await http.delete(`${ENDPOINT}/${id}`).then(() => getPagos())
  }
}

onMounted(() => {
  getPagos()//esto me llama para que cuando yo entre a pago me muestre los datos
})
</script>

<template>
  <div class="container"><!--div general con bootstrap con diseño-->
    <nav aria-label="breadcrumb"><!--//clase propias de botstrap-->
      <ol class="breadcrumb"><!--//clase propias de botstrap-->
        <li class="breadcrumb-item"><RouterLink to="/">Inicio</RouterLink></li><!--//clase propias de botstrap-->
        <li class="breadcrumb-item active" aria-current="page">Pago</li><!--//clase propias de botstrap--> 
      </ol>
    </nav>

    <div class="row">
      <h2>Lista de Pagos</h2>
      <div class="col-12">
        <RouterLink to="/pago/crear"><!--Enlace deswwgaer para crear-->
          <font-awesome-icon icon="fa-solid fa-plus" />Crear Nuevo Pago<!--implmetacion del icono-->
        </RouterLink>
      </div>
    </div>

    <div class="table-responsive"><!--tablas propias de bottstrap-->
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">N°</th>
            <th scope="col">Mes</th>
            <th scope="col">Tiempo Extra</th>
            <th scope="col">total</th> 
            <th scope="col">idRepartidor</th> 
            <th scope="col">Editar/Cancelar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(pago, index) in pagos" :key="pago.id"><!--el singular solo es una variable-->
            <th scope="row">{{ index + 1 }}</th><!--cuando el intex comienza en 0 le damos mas 1-->
            <td>{{ pago.mes }}</td>
            <td>{{ pago.tiempoExtra }}</td>
            <td>{{ pago.total }}</td>
            <td>{{ pago.idRepartidor }}</td>
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