<template>
  <q-page class="tw-w-full">

    <q-card class="my-card tw-w-full tw-pt-6 md:tw-p-6">

      <q-card-section>
        <div class="tw-flex tw-justify-between">
          <div>
            <div class="tw-text-4xl tw-font-semibold">Проекты</div>
            <div class="tw-text-gray-600">Список проектов</div>
          </div>

          <div class="tw-self-center">
            <q-btn
              to="/documents/new"
              color="amber-6"
              label="Создать новый"
              rounded
              unelevated
            />
          </div>
        </div>
      </q-card-section>

      <q-separator/>

      <q-card-section class="tw-pt-12">

        <ProjectTable />

      </q-card-section>

    </q-card>

  </q-page>
</template>

<script setup>
import ProjectTable from 'components/projects/ProjectTable.vue'

</script>
