import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import Grid2 from '@mui/material/Grid2'
import InputLabel from '@mui/material/InputLabel'
import FormLabel from '@mui/material/FormLabel'
import Slider from '@mui/material/Slider'
import MenuItem from '@mui/material/MenuItem'
import MaterialTextField from '@mui/material/TextField'
import upcaseFirst from '../utils/upcaseFirst.js'

const requiredFields = ['name', 'language', 'voice']

const TextField = ({ field, label, variant = 'outlined', multiline, value, onChange }) => {
  return <MaterialTextField
    label={upcaseFirst(label ?? field)}
    value={value || ''}
    onChange={onChange}
    variant={variant}
    size='medium'
    multiline={multiline}
    rows={4}
  />
}

const RangeField = ({ field, label, min=1, max=5, step=1, value, onChange }) => {
  const error = requiredFields.includes(field) ? '*' : ''

  return <>
    <FormLabel>{upcaseFirst(label ?? field) + error}</FormLabel>
    <Slider
      value={value}
      shiftStep={30}
      min={min}
      max={max}
      step={step}
      onChange={onChange}
    />
  </>
}

const SelectField = ({ field, label, variant = 'outlined', value, onChange, options }) => {
  if (options.constructor === Array) {
    options = options.map((option) => [option, option])
  } else if (options.constructor === Object) {
    options = Object.keys(options).map((key) => [key, options[key]])
  }

  options = [['', ''], ...options]

  return <Select
    value={value}
    onChange={onChange}
    label={upcaseFirst(label ?? field)}
    variant={variant}
  >
    {options.map((option) => <MenuItem key={option[0]} value={option[0]}>
      {upcaseFirst(option[1])}
    </MenuItem>)}
  </Select>
}

const elements = {
  text: TextField,
  select: SelectField,
  range: RangeField,
}

const Field = ({ field, label, type = 'text', value, variant, onChange, options, multiline }) => {
  const Element = elements[type]
  const error = requiredFields.includes(field) ? '*' : ''
  const elementLabel = upcaseFirst(label ?? field)
  const inputLabel = type === 'select' ? upcaseFirst(label ?? field) : null

  return <Grid2 size='12'>
    <FormControl fullWidth>
      {inputLabel && <InputLabel>{inputLabel + error}</InputLabel>}

      <Element
        key={field}
        field={field}
        label={elementLabel + error}
        type={type}
        variant={variant}
        value={value}
        onChange={onChange}
        multiline={multiline}
        options={options}
      />
    </FormControl>
  </Grid2>
}

export default Field
