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
    name: 'updated_at',
    required: true,
    label: 'Last Updated',
    align: 'right',
    field: row => row.updated_at,
    format: val => `${val}`,
    style: 'width:240px',
    sortable: true
  },
]
