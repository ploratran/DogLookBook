import * as React from 'react'; 
import { Card, Image, Icon, Divider, Button, Label } from 'semantic-ui-react'; 
import ImageModel from '../type-interfaces/ImageModel'; 

interface ImageCardProps {
    image: ImageModel, 
}; 

const ImageItem: React.FC<ImageCardProps> = ({ image }) => {
    return (
        <Card>
            <Card.Content>
                <div>
                    <Image><Icon floated="left" avatar="true" size="large" name='user circle outline' /> </Image>
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