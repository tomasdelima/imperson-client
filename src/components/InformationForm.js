import { Button, Grid2 } from '@mui/material'
import Field from './Field.js'

const skills = [
  'acrobatics',
  'animal handling',
  'arcana',
  'athletics',
  'deception',
  'history',
  'insight',
  'intimidation',
  'investigation',
  'medicine',
  'nature',
  'perception',
  'performance',
  'persuasion',
  'religion',
  'sleight of hand',
  'stealth',
  'survival',
]

const InformationForm = ({ index, information, updateField, deleteInformation }) => {
  return <Grid2 container spacing={2} direction='row'>
    <Grid2 size={{ xs: 12, md: 6 }}>
      <Field variant='standard' field="condition" label="If" value={information.condition} onChange={(e) => updateField(index, 'condition', e)} />
    </Grid2>
    <Grid2 size={{ xs: 12, sm: 8, md: 3 }}>
      <Field type='select' variant='standard' field="check" label="Ask for a(n)" value={information.check} onChange={(e) => updateField(index, 'check', e)} options={skills} />
    </Grid2>
    <Grid2 size={{ xs: 12, sm: 4, md: 3 }}>
      <Field variant='standard' field="difficulty" label="Check with DC" value={information.difficulty} onChange={(e) => updateField(index, 'difficulty', e)} numeric />
    </Grid2>
    <Grid2 size={{ xs: 12, md: 6 }}>
      <Field variant='standard' field="success" label="On success" value={information.success} onChange={(e) => updateField(index, 'success', e)} />
    </Grid2>
    <Grid2 size={{ xs: 12, md: 6 }}>
      <Field variant='standard' field="failure" label="On failure" value={information.failure} onChange={(e) => updateField(index, 'failure', e)} />
    </Grid2>
    <Grid2 size={{ xs: 12, md: 6 }}>
      <Button onClick={() => deleteInformation(index, information.id)} color='error'>Delete Information</Button>
    </Grid2>
  </Grid2>
}

export default InformationForm
