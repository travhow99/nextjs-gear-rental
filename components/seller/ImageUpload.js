import { Button } from '@mui/material';
import axios from 'axios';

export default function ImageUpload({ productId }) {
  const uploadHandler = async (e) => {
    const formData = new FormData();
    const files = [];

    Object.keys(e.target.files).forEach(
      (file, index) => formData.append('files', e.target.files[file])
      //   files.push(e.target.files[file])
    );

    // const file = e.target.files[0];
    formData.append('productId', productId);

    try {
      const { data } = axios.post('/api/productImages', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('got data', data);
    } catch (error) {
      console.log('product img err', error);
    }
  };

  return (
    <Button variant="contained" component="label">
      Upload Image
      <input
        type="file"
        onChange={uploadHandler}
        accept="image/*"
        // multiple
        // max={4}
        hidden
      />
    </Button>
  );
}
