import post from '../utils/post.js'
import put from '../utils/put.js'

const TextField = ({ label, value, onChange }) => {
  return <div className="flex flex-row gap-16">
    <label className="w-40 leading-10">{label}</label>
    <input className="w-80 p-2 text-[#282c34]" value={value} onChange={onChange} />
  </div>
}

const SelectField = ({ label, value, onChange, options }) => {
  if (options.constructor === Array) {
    options = options.map((option) => [option, option])
  } else if (options.constructor === Object) {
    options = Object.keys(options).map((key) => [key, options[key]])
  }

  return <div className="flex flex-row gap-16">
    <label className="w-40 leading-10">{label}</label>
    <select className="w-80 p-2 text-[#282c34]" value={value} onChange={onChange}>
      {options.map((option) => <option key={option[0]} value={option[0]}>
        {option[1].charAt(0).toUpperCase() + option[1].slice(1)}
      </option>)}
    </select>
  </div>
}

const InformationForm = ({ index, information, updateField }) => {
  return <div className="flex flex-col">
    <TextField label="If" value={information.if} onChange={(e) => updateField(index, 'if', e)} />
    <TextField label="Ask for a(n)" value={information.check} onChange={(e) => updateField(index, 'check', e)} />
    <TextField label="Check with DC" value={information.difficulty} onChange={(e) => updateField(index, 'difficulty', e)} />
    <TextField label="On success" value={information.success} onChange={(e) => updateField(index, 'success', e)} />
    <TextField label="On failure" value={information.failure} onChange={(e) => updateField(index, 'failure', e)} />
  </div>
}

const allVoices = {
  female: ['alloy', 'nova', 'shimmer'],
  male: ['echo', 'onyx', 'fable'],
  other: ['alloy', 'fable', 'nova', 'shimmer', 'echo', 'onyx'],
}

const NpcForm = ({ npc, npcs, setNpcForm, setNpcs }) => {
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

  const updateInformationField = (index, field, e) => {
    let updatedNpc = { ...npc }
    updatedNpc.informations[index][field] = e.target.value
    setNpcForm(updatedNpc)
  }

  return <div>
    <div
      className="bg-black bg-opacity-50 z-5 fixed top-0 bottom-0 left-0 right-0"
      onClick={() => setNpcForm(null)}
    />

    <div className="fixed top-0 bottom-0 left-0 m-20 right-0 z-10 bg-[#282c34] overflow-y-scroll rounded">
      <div className="flex flex-col justify-center items-center p-16 gap-4">
        <TextField label="Name" value={npc.name} onChange={(e) => change('name', e)} />
        <SelectField label="Gender" value={npc.gender} onChange={(e) => change('gender', e)} options={['', 'male', 'female', 'other']} />
        <TextField label="Race" value={npc.race} onChange={(e) => change('race', e)} />
        <TextField label="Job" value={npc.job} onChange={(e) => change('job', e)} />
        <TextField label="Greet" value={npc.greet} onChange={(e) => change('greet', e)} />
        <TextField label="Portrait" value={npc.portrait} onChange={(e) => change('portrait', e)} />
        <TextField label="Traits" value={npc.traits} onChange={(e) => change('traits', e)} />
        <SelectField label="Language" value={npc.language} onChange={(e) => change('language', e)} options={{ en: 'english', pt: 'portuguese'}} />
        <SelectField label="Voice" value={npc.voice} onChange={(e) => change('voice', e)} options={voices} />

        <label className="my-4">Informations</label>

        {(npc.informations || []).map((information, index) => <InformationForm
          key={index}
          index={index}
          information={information}
          updateField={updateInformationField}
        />)}

        <button
          className="cursor-pointer rounded hover:bg-gray-900 px-4 py-2 mt-8 mx-2 transition-all duration-200 select-none"
          onClick={addInformation}
        >
          Add Information
        </button>

        <div className="flex flex-row gap-8">
          <button
            className="cursor-pointer rounded hover:bg-gray-900 px-4 py-2 mt-8 transition-all duration-200 select-none"
            onClick={() => setNpcForm(null)}
          >
            Cancel
          </button>
          <button
            className="cursor-pointer rounded hover:bg-gray-900 px-4 py-2 mt-8 transition-all duration-200 select-none"
            onClick={save}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
}

export default NpcForm
