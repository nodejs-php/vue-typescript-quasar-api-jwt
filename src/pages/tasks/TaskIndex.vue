<template>
  <q-page>
    <q-card>
      <q-card-section>
        <div>
          <div>
            <div>Проекты</div>
            <div>Список задач</div>
          </div>
          <div>
            <q-btn
              to="/tasks/new"
              color="amber-6"
              label="Создать новый"
              rounded
              unelevated
            />
          </div>
        </div>
      </q-card-section>
      <q-separator/>
      <q-card-section>
        <TaskTable/>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script setup>
import TaskTable from 'components/tasks/TaskTable.vue'
</script>
