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
    <Controller
      render={({ field }) => (
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
      )}
      //   onChange={([, data]) => data}
      defaultValue={defaultValue || null}
      name={name}
      control={control}
      rules={rules}
    />
  );
};

export default ControlledAutocomplete;
