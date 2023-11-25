<template>
  <div>
    <div class="tw-w-full tw-pb-3 tw-mx-auto xl:tw-w-4/6">
      <q-input
        type="textarea"
        v-model="form.subject"
        label="Subject"
        rows="5"
        :error="errors.form.hasOwnProperty('subject') ?? false"
        :error-message="errors.form.subject?.[0] ?? ''"
        :rules="[val => val.length > 1 || 'Please input a longer subject.']"
        :loading="data.loading"
        :disable="data.loading"
        outlined
        autogrow
      />
    </div>


    <div class="tw-text-center tw-py-12">
      <q-btn
        @click="save"
        color="amber-6"
        label="Save"
        class="tw-mr-3"
        :disable="form.project_title?.length < 2 || data.loading"
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

const router = useRouter()

const form = reactive({
  project_title: '',
  description: '',
})

const data = reactive({
  formDefault: {},
  loading: false,
})

const errors = reactive({
  form: {},
})


const save = () => {
  clearErrors()
  data.loading = true

  api.post('/documents', form).then(() => {
    router.push({name: 'documents.index'})
  }).catch((err) => {
    showError(err, 'result', 'Saving failed! Please try again.')
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

onMounted(() => {
  data.formDefault = {...form}
})

</script>
