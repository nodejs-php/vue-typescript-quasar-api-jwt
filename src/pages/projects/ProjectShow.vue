<template>
  <q-page>
    <q-card class="my-card">
      <q-card-section>
        <div>
          <div>
            <div>Просмотр проекта</div>
          </div>
          <div>
            <q-btn
              to="/"
              label="Назад к списку"
              color="white"
              text-color="black"
              icon="arrow_left"
              rounded
            />
          </div>
        </div>
      </q-card-section>
      <q-separator/>
      <q-card-section>
      <ProjectView/>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import ProjectView from 'components/projects/ProjectView.vue';
</script>
