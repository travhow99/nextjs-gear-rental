import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@mui/material';
import { Controller } from 'react-hook-form';

const ControlledAutocomplete = ({
  options = [],
  renderInput,
  getOptionLabel,
  onChange: ignored,
  control,
  defaultValue,
  name,
  renderOption,
  freeSolo,
  rules,
}) => {
  console.log(control);
  return (
    <Autocomplete
      freeSolo={freeSolo}
      fullWidth
      options={options}
      getOptionLabel={getOptionLabel}
      //   renderOption={renderOption}
      renderInput={renderInput}
      onChange={(e, data) => {
        console.log('onchange', data);
        field.onChange(data);
      }}
      {...field}
    >
      {console.log('field', field)}
    </Autocomplete>
  );
};

export default ControlledAutocomplete;
