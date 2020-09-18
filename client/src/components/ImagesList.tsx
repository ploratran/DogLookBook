import * as React from 'react'; 
import ImageModel   from '../type-interfaces/ImageModel'; 
import { Card, Divider, Button } from 'semantic-ui-react'; 
import { History } from 'history'; 
import ImageItem from './ImageItem';
import Auth from '../auth/Auth';
import { getImages } from '../api/images-api'; 

interface ImagesListProps {
    history: History, 
    auth: Auth,
}; 

const ImagesList: React.FC<ImagesListProps> = ({ history, auth }) => {

    const [images, setImages] = React.useState<ImageModel[]>([]); 

    const handleUploadImage = () => {
        history.push(`/images/:imageId/edit`); 
    }; 

    React.useEffect(() => {
        async function getAllImages() {
            const images = await getImages(auth.getIdToken()); 
            console.log(`test: ${Object.values(images[0])}`);
            setImages(images); 
        }
        
        try {
    
            getAllImages(); 
        } catch(e) {
            alert(`Failed to fetch images ${e.message}`); 
        }
        
    }, []); 

    return (
        <div>
            <Button
                primary
                size='huge'
                className='add-button'
                onClick={handleUploadImage}
            >
                Upload New Image 
            </Button>

            <Divider clearing />

            <Card.Group>
                {images.map(image => {
                    return <ImageItem key={image.imageId} image={image} />
                })}
            </Card.Group>
        </div>
    )
}; 

export default ImagesList; 