import { useState } from 'react'

import Button from './Button.js'
import destroy from '../utils/destroy.js'
import post from '../utils/post.js'
import put from '../utils/put.js'

const Label = ({ field, required }) => {
  const label = `${field[0].toUpperCase()}${field.slice(1)}`

  return <label className="w-60 leading-10">
    {label}
    {required && <span className="ml-1 text-red-300">*</span>}
  </label>
}

const TextField = ({ field, label, value, onChange }) => {
  return <div className="flex flex-row gap-16">
    <Label field={label ?? field} required={requiredFields.includes(field)} />
    <input className="w-80 p-2 text-[#282c34]" value={value || ''} onChange={onChange} />
  </div>
}

const LongTextField = ({ field, label, value, onChange }) => {
  return <div className="flex flex-row gap-16">
    <Label field={label ?? field} required={requiredFields.includes(field)} />
    <textarea className="w-80 p-2 text-[#282c34]" value={value || ''} onChange={onChange} />
  </div>
}

const RangeField = ({ field, label, min=0, max=10, step=1, value, onChange }) => {
  return <div className="flex flex-row gap-16">
    <Label field={label ?? field} required={requiredFields.includes(field)} />
    <input type="range" min={min} max={max} step={step} className="w-80 p-2 text-[#282c34]" value={value || ''} onChange={onChange} />
  </div>
}

const SelectField = ({ field, label, value, onChange, options }) => {
  if (options.constructor === Array) {
    options = options.map((option) => [option, option])
  } else if (options.constructor === Object) {
    options = Object.keys(options).map((key) => [key, options[key]])
  }

  options = [['', ''], ...options]

  return <div className="flex flex-row gap-16">
    <Label field={label ?? field} required={requiredFields.includes(field)} />
    <select className="w-80 p-2 text-[#282c34]" value={value} onChange={onChange}>
      {options.map((option) => <option key={option[0]} value={option[0]}>
        {option[1].charAt(0).toUpperCase() + option[1].slice(1)}
      </option>)}
    </select>
  </div>
}

const InformationForm = ({ index, information, updateField, deleteInformation }) => {
  return <div className="flex flex-col">
    <TextField field="condition" label="If" value={information.condition} onChange={(e) => updateField(index, 'condition', e)} />
    <TextField field="check" label="Ask for a(n)" value={information.check} onChange={(e) => updateField(index, 'check', e)} />
    <TextField field="difficulty" label="Check with DC" value={information.difficulty} onChange={(e) => updateField(index, 'difficulty', e)} />
    <TextField field="success" label="On success" value={information.success} onChange={(e) => updateField(index, 'success', e)} />
    <TextField field="failure" label="On failure" value={information.failure} onChange={(e) => updateField(index, 'failure', e)} />
    <Button label="Delete Information" onClick={() => deleteInformation(index, information.id)} variant="danger" />
  </div>
}

const allVoices = {
  female: ['alloy', 'nova', 'shimmer'],
  male: ['echo', 'onyx', 'fable'],
  other: ['alloy', 'fable', 'nova', 'shimmer', 'echo', 'onyx'],
}

const requiredFields = ['name', 'language', 'voice']

const NpcForm = ({ npc, npcs, setNpcForm, setNpcs }) => {
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
  }

  const deleteNpc = async () => {
    const newPressedDelete = pressedDelete + 1
    setPressedDelete(newPressedDelete)

    if (newPressedDelete < 3) return

    await destroy(`npcs/${npc.id}`)
    setNpcs(npcs.filter((n) => n.id !== npc.id))
    setNpcForm(null)
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

  return <div>
    <div
      className="bg-black bg-opacity-50 z-5 fixed top-0 bottom-0 left-0 right-0"
      onClick={() => setNpcForm(null)}
    />

    <div className="fixed top-0 bottom-0 left-0 m-20 right-0 z-10 bg-[#282c34] overflow-y-scroll rounded">
      <div className="flex flex-col justify-center items-center p-16 gap-4">
        <TextField field="name" value={npc.name} onChange={(e) => change('name', e)} />
        <SelectField field="language" value={npc.language} onChange={(e) => change('language', e)} options={{ en: 'english', pt: 'portuguese'}} />
        <SelectField field="gender" value={npc.gender} onChange={(e) => change('gender', e)} options={['male', 'female', 'other']} />
        <SelectField field="voice" value={npc.voice} onChange={(e) => change('voice', e)} options={voices} />

        <TextField field="race" value={npc.race} onChange={(e) => change('race', e)} />
        <TextField field="job" value={npc.job} onChange={(e) => change('job', e)} />
        {/* <TextField field="greet" value={npc.greet} onChange={(e) => change('greet', e)} /> */}
        <TextField field="portrait" value={npc.portrait} onChange={(e) => change('portrait', e)} />
        <SelectField field="alignment" value={npc.alignment} onChange={(e) => change('alignment', e)} options={aligments} />

        <RangeField field="extraversion" min={1} max={5} value={npc.extraversion} onChange={(e) => change('extraversion', e)} />
        <RangeField field="agreeableness" min={1} max={5} value={npc.agreeableness} onChange={(e) => change('agreeableness', e)} />
        <RangeField field="conscientiousness" min={1} max={5} value={npc.conscientiousness} onChange={(e) => change('conscientiousness', e)} label="Carefulness" />
        <RangeField field="neuroticism" min={1} max={5} value={npc.neuroticism} onChange={(e) => change('neuroticism', e)} label="Emotional Reactivity" />
        <RangeField field="openness_to_experience" min={1} max={5} value={npc.openness_to_experience} onChange={(e) => change('openness_to_experience', e)} label="Openness to Experience" />

        <SelectField field="tone" value={npc.tone} onChange={(e) => change('tone', e)} options={['Authoritative', 'Conservative', 'Edgy', 'Enthusiastic', 'Formal', 'Friendly', 'Informative', 'Irreverent', 'Passionate', 'Professional', 'Romantic', 'Sarcastic', 'Serious']} />
        <RangeField field="empathy" min={1} max={5} value={npc.empathy} onChange={(e) => change('empathy', e)} />
        <RangeField field="verbosity" min={1} max={5} value={npc.verbosity} onChange={(e) => change('verbosity', e)} />
        <RangeField field="humor" min={1} max={5} value={npc.humor} onChange={(e) => change('humor', e)} />
        <RangeField field="formality" min={1} max={5} value={npc.formality} onChange={(e) => change('formality', e)} />

        <TextField field="traits" value={npc.traits} onChange={(e) => change('traits', e)} label="Extra traits" />

        <label className="my-4">Informations</label>

        {(npc.informations || []).filter((i) => !i.delete).map((information, index) => <InformationForm
          key={index}
          index={index}
          information={information}
          updateField={updateInformationField}
          deleteInformation={deleteInformation}
        />)}

        <Button label="Add Information" onClick={addInformation} />

        <div className="flex flex-row gap-8">
          <Button label="Cancel" onClick={() => setNpcForm(null)} />
          <Button label="Save" onClick={save} />
        </div>

        {npc.id && <Button label="Delete" onClick={deleteNpc} variant="danger" />}
      </div>
    </div>
  </div>
}

export default NpcForm
