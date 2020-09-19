import * as React from 'react'; 
import ImageModel   from '../type-interfaces/ImageModel'; 
import { Card, Divider, Button, Grid } from 'semantic-ui-react'; 
import { History } from 'history'; 
import ImageItem from './ImageItem';
import Auth from '../auth/Auth';
import { getImages } from '../api/images-api'; 

interface ImagesListProps {
    history: History, 
    auth: Auth,
}; 

const ImagesList: React.FC<ImagesListProps> = ({ history, auth }) => {

    // states: 
    const [images, setImages] = React.useState<ImageModel[]>([]); 

    // Go to Upload New Image page on click event:
    const handleUploadImage = () => {
        history.push(`/images/:imageId/edit`); 
    }; 

    React.useEffect(() => {
        // call getImages(): 
        async function getAllImages() {
            const images = await getImages(auth.getIdToken()); 
            setImages(images); 
        }
        try {
            getAllImages(); 
        } catch(e) {
            alert(`Failed to fetch images ${e.message}`); 
        }
    }, [auth]); 

    return (
        <div>
            {/* Button to Upload New Image */}
            <Button
                primary
                size='huge'
                className='add-button'
                onClick={handleUploadImage}
            >
                Upload New Image 
            </Button>

            <Divider clearing />

            <Grid centered columns={2}>
                <Grid.Column>
            {/* Display Images */}
                <Card.Group itemsPerRow={1}>
                    {images.map(image => {
                        return <ImageItem key={image.imageId} image={image} />
                    })}
                </Card.Group>
                </Grid.Column>
            </Grid>
        </div>
    )
}; 

export default ImagesList; 