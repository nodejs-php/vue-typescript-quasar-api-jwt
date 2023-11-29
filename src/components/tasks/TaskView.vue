<template>
  <q-card flat bordered class="my-card">
    <div class="row">
      <div class="col-4 col-sm-4">
        <div>
          <q-card-section>
            <div class="text-h6">{{ data.project.project_title }}</div>
          </q-card-section>

          <q-separator inset class="tw-mb-6"/>

          <q-card-section>
            <div class="text-subtitle2 tw-pb-3">Id</div>
            {{ data.project.id }}
          </q-card-section>

          <q-card-section>
            <div class="text-subtitle2 tw-py-3">Status</div>
            <div v-html="data.project.status"></div>
          </q-card-section>

          <q-card-section>
            <div class="text-subtitle2 tw-py-3">Нужно сделать</div>
            <div v-html="data.project.deadline"></div>
          </q-card-section>
        </div>
      </div>
      <div class="col-4 col-sm-4">
        <div class="q-pa-md" style="max-width: 350px">
          <q-toolbar class="bg-primary text-white shadow-2">
            <q-toolbar-title>Назначено</q-toolbar-title>
          </q-toolbar>

          <q-list bordered>
            <q-item v-for="user in data.project.assignees" :key="user.id" class="q-my-sm" clickable v-ripple>
              <q-item-section>
                {{ user.name }}
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
      <div class="col-4 col-sm-4">
        <div class="q-pa-md" style="max-width: 350px">
          <q-toolbar class="bg-primary text-white shadow-2">
            <q-toolbar-title>Задачи</q-toolbar-title>
          </q-toolbar>

          <q-list bordered>
            <q-item v-for="task in data.project.tasks" :key="task.id" class="q-my-sm" clickable v-ripple>
              <q-item-section>
                {{ task.task_title }}
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
    </div>


  </q-card>
</template>

<script setup>
import {reactive, onMounted} from 'vue'
import {useRoute} from 'vue-router'
import {getTasksShow} from 'components/api/tasks';

const route = useRoute()
const data = reactive({
  loading: false,
  project: {},
})

const loadData = async (id) => {
  await getTasksShow(id)
    .then(async (res) => {
      data.project = await res.data
    }).finally(() => {
      data.loading = false
    })
}

onMounted(async () => {
  await loadData(route.params.id)
})

</script>
