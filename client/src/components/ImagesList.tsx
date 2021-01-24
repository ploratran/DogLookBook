import * as React from 'react'; 
import ImageModel   from '../type-interfaces/ImageModel'; 
import { Card, Divider, Button, Grid, Image, Icon } from 'semantic-ui-react'; 
import { History } from 'history'; 
// import ImageItem from './ImageItem';
import Auth from '../auth/Auth';
import { getInitialImages, deleteImage, getMoreImages } from '../api/images-api'; 

interface ImagesListProps {
    history: History, 
    auth: Auth,
}; 

const ImagesList: React.FC<ImagesListProps> = ({ history, auth }) => {

    // all states: 
    const [images, setImages] = React.useState<ImageModel[]>([]); 
    // let nextKey: string;

    // Go to Upload New Image page on click event:
    const handleCreateImage = () => {
        history.push(`/images/create`); 
    }; 

    // Go to Edit Image page on click event: 
    const onEditButtonClick = (imageId: string) => {
        history.push(`/images/${imageId}`);
    }

    // use async/await to display initial image upon sign-in using getImages(): 
    const fetchInitialImages = async () => {
        const result = await getInitialImages(auth.getIdToken()); 

        setImages(result.items); 
    }

    // use async/await to display image upon click "More" button using getMoreImages(): 
    const fetchMoreImages = async () => {
        const result = await getMoreImages(auth.getIdToken());
        console.log(result.items);
        setImages(result.items);
    }

    // GET initial images in homepage: 
    React.useEffect(() => {
        try {
            fetchInitialImages(); 
        } catch(e) {
            alert(`Failed to fetch images ${e.message}`); 
        }
    }, [auth]); 


    // set state of images to images not being deleted: 
    const setNewImageList = (imageId: string) => {
        const newImages = images.filter((image) => image.imageId !== imageId);
        setImages(newImages);  
    }

    // DELETE image:
    async function handleDeleteImage(imageId: string) {
        try {
            alert(`Image deleted!`);
            await deleteImage(auth.getIdToken(), imageId);  // call deleteImage():
            setNewImageList(imageId); 
        } catch (e) {
            alert(`Failed to delete image ${e.message}`); 
        }
    }

    // handle user action on clicking "More" button: 
    const handleClickMore = (e: React.SyntheticEvent) => {
        e.preventDefault();
        console.log("click");
        fetchMoreImages();
    }

    return (
        <div>
            {/* Button to Upload New Image */}
            <Button
                primary
                size='huge'
                className='add-button'
                onClick={handleCreateImage}
            >
                Upload New Image 
            </Button>

            <Divider clearing />

            {/* Display images */}
            <Grid centered columns={2}>
                <Grid.Column>
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
                                            onClick={() => onEditButtonClick(image.imageId)}
                                        > Edit </Button>
                                        <Button 
                                            basic 
                                            color="red"
                                            onClick={() => handleDeleteImage(image.imageId)}
                                        > Delete </Button>
                                    </div>
                                </Card.Content>
                            </Card>
                    )})}
                </Card.Group>
                </Grid.Column>
                <Divider clearing />
            </Grid>
            
            {/* Fetch more button */}
            <Grid>
                <Grid.Column textAlign="center">
                    <Button
                        onClick={handleClickMore}
                    >More</Button>
                </Grid.Column>
            </Grid>
        </div>
    )
}; 

export default ImagesList; 