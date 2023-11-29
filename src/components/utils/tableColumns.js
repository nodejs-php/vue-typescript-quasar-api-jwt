export const projectsTableColumns = [
  {
    name: 'project_title',
    required: true,
    label: 'Имя проекта',
    align: 'left',
    field: row => row.project_title,
    format: val => `${val}`,
    sortable: false
  },
  {
    name: 'description',
    required: true,
    label: 'Описание',
    align: 'left',
    field: row => row.description,
    format: val => `${val}`,
    sortable: false
  },
  {
    name: 'deadline',
    required: true,
    label: 'Срок',
    align: 'left',
    field: row => row.deadline,
    format: val => `${val}`,
    sortable: false
  },
  {
    name: 'status',
    required: true,
    label: 'Статус',
    align: 'left',
    field: row => row.status,
    format: val => `${val}`,
    sortable: false
  },
  {
    name: 'priority',
    required: true,
    label: 'Приоритет',
    align: 'left',
    field: row => row.priority,
    format: val => `${val}`,
    sortable: false
  },
]


export const tasksTableColumns = [
  {
    name: 'task_title',
    required: true,
    label: 'Имя задачи',
    align: 'left',
    field: row => row.task_title,
    format: val => `${val}`,
    sortable: false
  },
  {
    name: 'description',
    required: true,
    label: 'Описание',
    align: 'left',
    field: row => row.description,
    format: val => `${val}`,
    sortable: false
  },
  {
    name: 'deadline',
    required: true,
    label: 'Срок',
    align: 'left',
    field: row => row.deadline,
    format: val => `${val}`,
    sortable: false
  },
  {
    name: 'status',
    required: true,
    label: 'Статус',
    align: 'left',
    field: row => row.status,
    format: val => `${val}`,
    sortable: false
  },
]
