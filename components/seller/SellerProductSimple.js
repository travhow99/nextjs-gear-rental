import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@material-ui/core';
import NextLink from 'next/link';

export default function SellerProductSimple({ id, image, title, price }) {
  return (
    <Card>
      <NextLink href={`/seller/products/${id}`} passHref>
        <CardActionArea>
          <CardMedia
            component="img"
            image={
              image ||
              'https://res.cloudinary.com/dwkrq4yib/image/upload/v1646708202/upload-g7c1cfd275_1280_nfmiiy.png'
            }
            title={title}
          ></CardMedia>
          <CardContent>
            <Typography>{title}</Typography>
          </CardContent>
        </CardActionArea>
      </NextLink>
      <CardActions>
        <Typography>${price}</Typography>
      </CardActions>
    </Card>
  );
}
