import * as React from 'react'; 
import ImageModel   from '../type-interfaces/ImageModel'; 
import { Card, Divider, Button, Grid, Image, Icon, Confirm } from 'semantic-ui-react'; 
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
    // state to confirm delete: 
    const [open, setOpen] = React.useState(false); 

    // Go to Upload New Image page on click event:
    const handleUploadImage = () => {
        history.push(`/images/create`); 
    }; 

    // GET all images in homepage: 
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

    const setNewImageList = (imageId: string) => {
        const newImages = images.filter((image) => image.imageId !== imageId);
        setImages(newImages);  
    }

    // DELETE 1 image:
    async function handleDeleteImage(imageId: string) {
        // call deleteImage(): 
        try {
            console.log(`Deleting image: ${imageId}`);
            alert(`Image deleted!`);
            await deleteImage(auth.getIdToken(), imageId);
            // setOpen(false);
            setNewImageList(imageId);
            history.push(`/`);
        } catch (e) {
            alert(`Failed to delete image ${e.message}`); 
        }
    }

    // // Show Delete confirmation window:
    // const show = () => {
    //     setOpen(true);
    // }

    // // handle Cancel when user denies to Delete an image:
    // const handleCancel = () => {
    //     setOpen(false); 
    // }

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
                                        > Edit </Button>
                                        <Button 
                                            basic 
                                            color="red"
                                            onClick={() => handleDeleteImage(image.imageId)}
                                        > Delete </Button>
                                        {/* <Button basic color="red" onClick={show}>Delete</Button>
                                        <Confirm
                                            open={open}
                                            content="Are you sure to delete?"
                                            cancelButton="Cancel"
                                            confirmButton="Yes, delete"
                                            onCancel={handleCancel}
                                            onConfirm={() => handleDeleteImage(image.imageId)}
                                        /> */}
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