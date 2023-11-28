<template>
  <q-page>
    <q-card class="my-card">
      <q-card-section>
        <div>
          <div>
            <div>Новая задача</div>
          </div>
          <div>
            <q-btn
              to="/tasks"
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
        <TaskForm/>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script setup>
import TaskForm from 'src/components/tasks/TaskForm.vue'
</script>
