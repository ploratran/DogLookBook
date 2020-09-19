import * as React from 'react'; 
import ImageModel   from '../type-interfaces/ImageModel'; 
import { Card, Divider, Button, Grid, Image, Icon } from 'semantic-ui-react'; 
import { History } from 'history'; 
// import ImageItem from './ImageItem';
import Auth from '../auth/Auth';
import { getImages, deleteImage } from '../api/images-api'; 

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

    const handleRemove = (id: string) => {
        const newList = images.filter((image) => image.imageId !== id);
        setImages(newList);  
    }

    // DELETE 1 image:
    const handleDeleteImage = async (imageId: string) => {
        try {
            await deleteImage(auth.getIdToken(), imageId);
            handleRemove(imageId)
        } catch (e) {
            alert(`Failed to delete image ${e.message}`); 
        }
    }

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
                        // return <ImageItem key={image.imageId} image={image} auth={auth}/>
                        return (
                            <Card key={image.imageId}>
                                <Card.Content>
                                    <div>
                                        <Icon floated="left" avatar="true" size="large" name='user circle outline' />
                                        <span>{image.userId?.substring(14)}</span>
                                    </div>
                                    {image.imageUrl && (
                                        <Image src={image.imageUrl} size="big" bordered/>
                                    )}
                                    <Divider clearing />
                                    <Card.Header>{image.description}</Card.Header>
                                    <Icon name='history'/>{image.createdAt}
                                </Card.Content>

                                <Card.Content extra>
                                    <div>
                                        <Button 
                                            basic 
                                            color="blue"
                                        >
                                            Edit
                                        </Button>
                                        <Button 
                                            basic 
                                            color="red"
                                            onClick={() => handleDeleteImage(image.imageId)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </Card.Content>
                            </Card>
                    )})}
                </Card.Group>
                </Grid.Column>
            </Grid>
        </div>
    )
}; 

export default ImagesList; 