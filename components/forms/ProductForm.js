import { List, ListItem, TextField } from '@material-ui/core';
import { useState } from 'react';

/**
 * @todo In progress
 */
const ProductForm = (props) => {
  const [first, setfirst] = useState(second);
  const [errors, setErrors] = useState({
    title: null,
    brand: null,
    category: null,
    stock: null,
    description: null,
    price: null,
  });

  return (
    <form>
      <List>
        <ListItem>
          <TextField
            name="title"
            variant="outlined"
            fullWidth
            id="title"
            label="Product Name"
            value={title}
            onChange={(e, newValue) => {
              setTitle(e.target.value);
            }}
            // inputValue={titleInputValue}
            // inputProps={{ type: 'title' }}
            error={Boolean(errors.title)}
            helperText={
              errors.title
                ? errors.title.type === 'minLength'
                  ? 'Product Name length is more than 1'
                  : 'Product Name is required'
                : ''
            }
          />
        </ListItem>
      </List>
    </form>
  );
};

export default ProductForm;
