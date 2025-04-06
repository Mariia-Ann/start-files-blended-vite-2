import PhotosGalleryItem from "../PhotosGalleryItem/PhotosGalleryItem";
import GridItem from "../GridItem/GridItem";
import Grid from "../Grid/Grid";

const PhotosGallery = ({images, openModal}) => {
  return (
  <Grid>
  {images.map((image) => (
    <GridItem key={image.id}>
      <PhotosGalleryItem image={image} openModal={openModal} />
    </GridItem>
  ))}
</Grid>
)}
export default PhotosGallery;
