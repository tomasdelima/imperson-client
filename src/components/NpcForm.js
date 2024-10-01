import { useState } from 'react'

import Button from '@mui/material/Button'
import Grid2 from '@mui/material/Grid2'
import destroy from '../utils/destroy.js'
import post from '../utils/post.js'
import put from '../utils/put.js'
import Field from './Field.js'
import InformationForm from './InformationForm.js'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

const allVoices = {
  female: ['alloy', 'nova', 'shimmer'],
  male: ['echo', 'onyx', 'fable'],
  other: ['alloy', 'fable', 'nova', 'shimmer', 'echo', 'onyx'],
}

const NpcForm = ({ npc, npcs, setNpcForm, setNpcs, fetchNpcs, setActiveNpc }) => {
  const [pressedDelete, setPressedDelete] = useState(0)
  const voices = allVoices[npc.gender || 'other']

  const change = (field, e) => {
    let updatedNpc = { ...npc }
    updatedNpc[field] = e.target.value
    setNpcForm(updatedNpc)
  }

  const save = async () => {
    if (npc.id) {
      const data = await put(`npcs/${npc.id}`, npc)
      setNpcs(npcs.map((n) => n.id === npc.id ? data : n))
    } else {
      const data = await post('npcs', npc)
      setNpcs([...npcs, data])
    }

    setNpcForm(null)
    fetchNpcs()
  }

  const deleteNpc = async () => {
    const newPressedDelete = pressedDelete + 1
    setPressedDelete(newPressedDelete)

    if (newPressedDelete < 3) return

    await destroy(`npcs/${npc.id}`)
    setNpcs(npcs.filter((n) => n.id !== npc.id))
    setNpcForm(null)
    setActiveNpc(null)
  }

  let deleteLabel = 'Delete'
  if (pressedDelete) {
    deleteLabel += ` (click ${3 - pressedDelete} time${pressedDelete < 2 ? 's' : ''})`
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
      { field: 'gender', type: 'select', options: ['male', 'female', 'other'] },
      { field: 'voice', type: 'select', options: voices },
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

  return <div>
    <div
      className="bg-black bg-opacity-50 z-5 fixed top-0 bottom-0 left-0 right-0"
      onClick={() => setNpcForm(null)}
    />

    <div className="fixed top-0 bottom-0 left-0 m-20 right-0 z-10 bg-[#d8dcd4] overflow-y-scroll rounded">
      <Grid2 container spacing={4} direction='row' className='p-10'>
        <Grid2 size={12}>
          <Typography variant='h5'>Edit</Typography>
        </Grid2>

        {fieldColumns.map((fields, index) =>
          <Grid2 key={index} container direction='column' size={6}>
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

      <Grid2 container spacing={4} direction='row' className='p-10'>
        <Grid2 container spacing={4} direction='row'>
          <Grid2 container direction='column' size={6}>
            <Button onClick={() => setNpcForm(null)}>Cancel</Button>
          </Grid2>
          <Grid2 container direction='column' size={6}>
            <Button onClick={save}>Save</Button>
          </Grid2>
        </Grid2>

        {npc.id && <Button onClick={deleteNpc}>
          {deleteLabel}
        </Button>}
      </Grid2>
    </div>
  </div>
}

export default NpcForm
