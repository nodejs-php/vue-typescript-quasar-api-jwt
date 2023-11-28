<template>
  <div>
    <q-table
      flat
      bordered
      title=""
      :grid="$q.screen.xs"
      :rows="data.rows"
      :columns="data.columns"
      :loading="data.loading"
      row-key="id"
      v-model:pagination="data.pagination"
      rows-per-page-options=""
      wrap-cells="true"
      @request="getAllData"
      @row-click="(evt, row, index) => viewProject(row)"
      class="tw-flex">
    </q-table>
  </div>
</template>

<script setup>
import  { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { api } from 'src/boot/axios'
import { projectsTableColumns } from 'components/utils/tableColumns'
import {getProjects} from "components/api/projects";

const router = useRouter()

const data = reactive({
  loading: false,
  rows: [],
  columns: projectsTableColumns,
  pagination: {
    page: 1,
    rowsPerPage: 12,
    rowsNumber: 0, // total
  },
})

const getAllData = async (tableProps) => {
  let pagination = await tableProps?.pagination ?? data.pagination
  const { page } = await pagination
  data.loading = true
  const params = await { page }

  await getProjects(params)
    .then(async (res) => {
      data.rows = await res.data.data
      data.pagination.rowsNumber = await res.data.total
      data.pagination = await {...pagination}
      await router.push({ path: '', params })
    }).finally(() => {
      data.loading = false
    })
}

const viewProject = (row) => {
  router.push({ name: 'projects.show', params: {id: row.id} })
}

onMounted(async () => {
  await getAllData()
})

</script>
