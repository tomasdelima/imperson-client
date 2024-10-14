import { useState } from 'react'
import { useNavigate } from "react-router-dom"

import { Button, Divider, Grid2, Modal, Paper, Typography } from '@mui/material'
import Field from './Field.js'
import InformationForm from './InformationForm.js'

import destroy from '../utils/destroy.js'
import post from '../utils/post.js'
import put from '../utils/put.js'

const voices = {
  alloy: 'alloy (f)',
  fable: 'fable (m)',
  nova: 'nova (f)',
  shimmer: 'shimmer (f)',
  echo: 'echo (m)',
  onyx: 'onyx (m)',
}

const aligments = {
  LG: 'Lawful good',
  NG: 'Neutral good',
  CG: 'Chaotic good',
  LN: 'Lawful neutral',
  N: 'True neutral',
  CN: 'Chaotic neutral',
  LE: 'Lawful evil',
  NE: 'Neutral evil',
  CE: 'Chaotic evil',
}

const fieldColumns = [
  [
    { field: 'name', type: 'text' },
    { field: 'language', type: 'select', options: { en: 'english', pt: 'portuguese'} },
    { field: 'voice', type: 'select', options: voices },
    { field: 'gender', type: 'select', options: ['male', 'female', 'other'] },
  ], [
    { field: 'race', type: 'text' },
    { field: 'job', type: 'text' },
    { field: 'portrait', type: 'text' },
    { field: 'alignment', type: 'select', options: aligments },
  ], [
    { field: 'extraversion', type: 'range' },
    { field: 'agreeableness', type: 'range' },
    { field: 'conscientiousness', type: 'range', label: 'Carefulness' },
    { field: 'neuroticism', type: 'range', label: 'Emotional Reactivity' },
    { field: 'openness_to_experience', type: 'range', label: 'Openness to Experience' },
  ], [
    { field: 'tone', type: 'select', options: ['Authoritative', 'Conservative', 'Edgy', 'Enthusiastic', 'Formal', 'Friendly', 'Informative', 'Irreverent', 'Passionate', 'Professional', 'Romantic', 'Sarcastic', 'Serious'] },
    { field: 'empathy', type: 'range' },
    { field: 'verbosity', type: 'range' },
    { field: 'humor', type: 'range' },
    { field: 'formality', type: 'range' },
  ],
]

const NpcForm = ({
  fetchNpcs,
  npc,
  npcs,
  setNpcForm,
  setNpcs,
}) => {
  const [pressedDelete, setPressedDelete] = useState(0)
  const navigate = useNavigate()

  const change = (field, e) => {
    let updatedNpc = { ...npc }
    updatedNpc[field] = e.target.value
    setNpcForm(updatedNpc)
  }

  const save = async () => {
    let response

    if (npc.id) {
      response = await put(`npcs/${npc.id}`, npc)
      setNpcs(npcs.map((n) => n.id === npc.id ? response : n))
    } else {
      response = await post('npcs', npc)
      setNpcs([...npcs, response])
    }

    navigate(`/npcs/${response.id}`, { replace: true })
    close()
    fetchNpcs()
  }

  const deleteNpc = async () => {
    const newPressedDelete = pressedDelete + 1
    setPressedDelete(newPressedDelete)

    if (newPressedDelete < 3) return

    await destroy(`npcs/${npc.id}`)
    setNpcs(npcs.filter((n) => n.id !== npc.id))
    setNpcForm({})
    navigate('/', { replace: true })
  }

  let deleteLabel = 'Delete'
  if (pressedDelete) {
    deleteLabel += ` (click ${3 - pressedDelete} more time${pressedDelete < 2 ? 's' : ''})`
  }

  const addInformation = () => {
    let updatedNpc = { ...npc }
    updatedNpc.informations = updatedNpc.informations || []
    updatedNpc.informations.push({
      if: '',
      check: '',
      difficulty: '',
      success: '',
      failure: '',
    })
    setNpcForm(updatedNpc)
  }

  const deleteInformation = (index, id) => {
    let updatedNpc = { ...npc }
    updatedNpc.informations[index] = { id, delete: true }
    setNpcForm(updatedNpc)
  }

  const updateInformationField = (index, field, e) => {
    let updatedNpc = { ...npc }
    updatedNpc.informations[index][field] = e.target.value
    setNpcForm(updatedNpc)
  }

  const close = () => {
    setPressedDelete(0)
    setNpcForm({})
  }

  return <Modal
    open={Object.keys(npc).length > 0}
    onClose={close}
  >
    <Paper
      className='justify-self-center overflow-x-auto absolute top-10 bottom-10 left-10 right-10 w-[80%] max-w-[60rem]'
      sx={{ scrollbarColor: '#8884 transparent', scrollbarWidth: 'thin' }}
    >
      <Grid2 container spacing={4} direction='row' className='p-10'>
        <Grid2 size={12}>
          <Typography variant='h5'>
            {npc.id ? 'Editing' : 'Creating'} NPC
          </Typography>
        </Grid2>

        {fieldColumns.map((fields, index) =>
          <Grid2 key={index} container direction='column' size={{ xs: 12, lg: 6 }}>
            {fields.map(({ field, type, label,  options }) => <Field
              key={field}
              field={field}
              label={label}
              type={type}
              value={npc[field]}
              onChange={(e) => change(field, e)}
              options={options}
            />)}
          </Grid2>
        )}

        <Grid2 container direction='column' size={12}>
          <Field field="traits" value={npc.traits} onChange={(e) => change('traits', e)} label="Extra traits" multiline />
        </Grid2>
      </Grid2>

      <Divider flexItem />

      <Grid2 container spacing={4} direction='row' className='p-10'>
        <Grid2 size={12}>
          <Typography variant='h5'>Informations</Typography>
        </Grid2>

        {(npc.informations || []).filter((i) => !i.delete).map((information, index) => <InformationForm
          key={index}
          index={index}
          information={information}
          updateField={updateInformationField}
          deleteInformation={deleteInformation}
        />)}

        <Grid2 size={12}>
          <Button onClick={addInformation}>Add Information</Button>
        </Grid2>
      </Grid2>

      <Divider flexItem />

      <Grid2 container spacing={4} direction='row' className='px-10 py-6'>
        <Grid2 container spacing={4} direction='row'>
          <Grid2 container direction='column' size={6}>
            <Button onClick={close}>Cancel</Button>
          </Grid2>
          <Grid2 container direction='column' size={6}>
            <Button onClick={save}>Save</Button>
          </Grid2>
        </Grid2>

        {npc.id && <Button onClick={deleteNpc} color='error'>
          {deleteLabel}
        </Button>}
      </Grid2>
    </Paper>
  </Modal>
}

export default NpcForm
