import * as React from 'react'; 
import { ImageModel } from '../type-interfaces/ImageModel'; 
import { Card, Divider, Button } from 'semantic-ui-react'; 
import { History } from 'history'; 
import ImageItem from './ImageItem'; 

interface ImagesListProps {
    history: History, 
}; 

const ImagesList = (props: ImagesListProps) => {

    const [images, setImages] = React.useState<ImageModel[]>([]); 

    const handleCreateImage = () => {
        props.history.push(`/images/create`); 
    }; 

    React.useEffect(() => {

    }, []); 

    return (
        <div>
            <h1>Images</h1>

            <Button
                primary
                size='huge'
                className='add-button'
                onClick={() => handleCreateImage}
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