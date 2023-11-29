<template>
  <div>
    <div class="tw-w-full tw-pb-3 tw-mx-auto xl:tw-w-4/6">
      <q-input
        type="textarea"
        v-model="form.task_title"
        label="Task Title"
        rows="5"
        :error="errors.form.hasOwnProperty('task_title') ?? false"
        :error-message="errors.form.task_title?.[0] ?? ''"
        :rules="[val => val.length > 1 || 'Пожалуйста, введите более длинное наименование таска.']"
        :loading="data.loading"
        :disable="data.loading"
        outlined
        autogrow
      />
      <q-select
        filled
        v-model="form.project"
        :options="data.projects_list"
        option-value="id"
        option-label="project_title"
        label="Проект"
        :error="errors.form.hasOwnProperty('use') ?? false"
        :error-message="errors.form.use?.[0] ?? ''"
        :loading="data.loading"
        :disable="data.loading"
      />

      <q-select
        filled
        v-model="form.user"
        :options="data.user_list"
        option-value="id"
        option-label="name"
        label="Пользователь"
        :error="errors.form.hasOwnProperty('use') ?? false"
        :error-message="errors.form.use?.[0] ?? ''"
        :loading="data.loading"
        :disable="data.loading"
        :display-value="name"
      />
      <div style="max-width: 300px">
        <q-input filled v-model="form.deadline"  :rules="['date']"  label="Дедлайн">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date
                  v-model="form.deadline"
                  mask="YYYY-MM-DD"
                  minimal
                  :error="errors.form.hasOwnProperty('project_title') ?? false"
                  :error-message="errors.form.project_title?.[0] ?? ''"
                  :loading="data.loading"
                  :disable="data.loading">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat/>
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>



      <q-input
        type="textarea"
        v-model="form.description"
        label="Описание"
        rows="5"
        :error="errors.form.hasOwnProperty('description') ?? false"
        :error-message="errors.form.description?.[0] ?? ''"
        :rules="[val => val.length > 1 || 'Пожалуйста, введите более длинное описание проекта.']"
        :loading="data.loading"
        :disable="data.loading"
        outlined
        autogrow
      />


      <q-input
        filled
        v-model="form.spent_time"
        label="Затраченное время, 00:00"
        mask="##:##:##"
        fill-mask="0"
        reverse-fill-mask
        :error="errors.form.hasOwnProperty('spent_time') ?? false"
        :error-message="errors.form.description?.[0] ?? ''"
        :loading="data.loading"
        :disable="data.loading"
      />

      <q-select
        filled
        v-model="form.status"
        :options="data.status_list"
        label="Статус"
        :error="errors.form.hasOwnProperty('use') ?? false"
        :error-message="errors.form.use?.[0] ?? ''"
        :loading="data.loading"
        :disable="data.loading"
      />
    </div>

    <div class="tw-text-center tw-py-12">
      <q-btn
        @click="save"
        color="amber-6"
        label="Save"
        class="tw-mr-3"
        :disable="form.task_title?.length < 2 || data.loading"
        :loading="data.loading"
        rounded
        unelevated
      />
    </div>
  </div>
</template>
<script setup>
import {onMounted, reactive} from 'vue'
import {api} from 'src/boot/axios'
import {useRouter} from 'vue-router'
import {getProjectFormOptions} from 'components/api/projects';

const router = useRouter()

const form = reactive({
  project_title: '',
  description: '',
  deadline: '',
  status: '',
  priority: '',
})

const data = reactive({
  formDefault: {},
  loading: false,
  user_list: [],
  status_list: [],
  priority_list: [],
})

const errors = reactive({
  form: {},
})


const save = () => {
  clearErrors()
  data.loading = true
  form.user_id = form.user.id
  form.project_id = form.project.id
  api.post('/api/tasks', form).then(() => {
    router.push({name: 'tasks.list'})
  }).catch((err) => {
    showError(err, 'result', 'Ошибка сохранения.')
  }).finally(() => {
    data.loading = false
  })
}

const reset = () => {
  data.loading = true
  resetResultFields()
  data.loading = false
}

const clearErrors = () => {
  errors.form = {}
}

const showError = (err, field, msg) => {
  if ([404, 500].includes(err.response?.status)) {
    errors.form[`${field}`] = []
    errors.form[`${field}`][0] = msg
  }
  if (err.response?.status == 422) {
    errors.form = err.response?.data?.errors
  }
}

const resetResultFields = () => {
  Object.assign(form, data.formDefault)
}

const getAllData = async () => {
  data.loading = true
  await getProjectFormOptions()
    .then(async (res) => {
      data.user_list = await res.data.users
      data.priority_list = await res.data.priority_list
      data.status_list =  await res.data.status_list
      data.projects_list =  await res.data.projects
    }).finally(() => {
      data.loading = false
    })
}

onMounted(() => {
  getAllData()
  data.formDefault = {...form}
})

</script>
