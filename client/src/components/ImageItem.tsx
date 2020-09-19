import * as React from 'react'; 
import { Card, Image, Icon, Divider, Button } from 'semantic-ui-react'; 
import ImageModel from '../type-interfaces/ImageModel'; 

interface ImageCardProps {
    image: ImageModel, 
}; 

const ImageItem: React.FC<ImageCardProps> = ({ image }) => {
    return (
        <Card fluid>
            <Card.Content>
                <Icon floated="left" name='user circle outline' /> 
                <Card.Meta>{image.userId?.substring(14)}</Card.Meta>
                {image.imageUrl && (
                    <Image src={image.imageUrl} />
                )}
                <Divider fluid="strue" clearing />
                <Card.Header>{image.description}</Card.Header>
                <Icon name='history'/>{image.createdAt}
            </Card.Content>
            <Card.Content extra>
                <div>
                    <Button basic color="blue">
                        Edit
                    </Button>
                    <Button basic color="red">
                        Delete
                    </Button>
                </div>
            </Card.Content>
        </Card>
    )
}; 

export default ImageItem; 