<script setup lang="ts">
import type { Pedido } from '@/models/pedido'
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'

const props = defineProps<{
  ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
var pedidos = ref<Pedido[]>([])

async function getPedido() {
  pedidos.value = await http.get(ENDPOINT).then((response) => response.data)
}

function toEdit(id: number) {
  router.push(`/pedido/editar/${id}`)
}

async function toDelete(id: number) {
  var r = confirm('¿Está seguro que se desea eliminar el pedido?')
  if (r == true) {
    await http.delete(`${ENDPOINT}/${id}`).then(() => getPedido())
  }
}

onMounted(() => {
  getPedido()
})
</script>

<template>
  <br><br><br>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <RouterLink to="/">Inicio</RouterLink>
        </li>
        <li class="breadcrumb-item active" aria-current="page" style="color: black;">
          Pedido
        </li>
      </ol>
    </nav>

    <div class="row">
      <h2 >Lista de Pedidos</h2>
      <div class="col-12">
        <RouterLink to="/pedido/crear">
          <font-awesome-icon icon="fa-solid fa-plus" />Crear Nuevo Pedido
        </RouterLink>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-bordered">
        <thead>
          <tr style="background-color: black;">
            <th scope="col" style="color: #E49E48;">N°</th>
            <th scope="col" style="color: #E49E48;">Orden del Pedido</th>
            <th scope="col" style="color: #E49E48;">Nombre del Repartidor</th>
            <th scope="col" style="color: #E49E48;">Nombre Cliente</th>
            <th scope="col" style="color: #E49E48;">Direccion</th>
            <th scope="col" style="color: #E49E48;">Nombre del Producto</th>
            <th scope="col" style="color: #E49E48;">Cantidad</th>
            <!-- <th scope="col" style="color: #E49E48;">
              <time datetime="08/10/2023">Fecha del Pedido</time> 
            </th> -->
            <th scope="col" style="color: #E49E48;">Fecha del Pedido</th> 
            <th scope="col" style="color: #E49E48;">Editar/Eliminar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(pedido, index, ) in pedidos" :key="pedido.id" style="background-color: black;">
            <th scope="row" style="color: #F8CB2E;">{{ index + 1 }}</th>
            <td align="center" style="color: #F8CB2E;">{{ pedido.id }}</td>
            <td style="color: #F8CB2E;">{{ pedido.repartidor.nombreR }}</td>
            <td style="color: #F8CB2E;">{{ pedido.nombreC }}</td>
            <td style="color: #F8CB2E;">{{ pedido.direccion }}</td>
            <td style="color: #F8CB2E;">{{ pedido.nombreProducto}}</td>
            <td style="color: #F8CB2E;">{{ pedido.cantidad}}</td>
            <td style="color: #F8CB2E;">{{ pedido.fechaPedido}}</td>
            
            <td>
              <button class="btn text-success" @click="toEdit(pedido.id)">
                <font-awesome-icon icon="fa-solid fa-edit" />
              </button>
              <button class="btn text-danger" @click="toDelete(pedido.id)">
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