import * as React from 'react'; 
import { Card, Image, Icon, Divider } from 'semantic-ui-react'; 
import ImageModel from '../type-interfaces/ImageModel'; 

interface ImageCardProps {
    image: ImageModel, 
}; 

const ImageItem = (props: ImageCardProps) => {
    return (
        <Card fluid>
            <Card.Content>
                <Icon name='user circle outline' /> 
                <Card.Meta>{props.image.userId}</Card.Meta>
                {props.image.imageUrl && (
                    <Image src={props.image.imageUrl} />
                )}
            <Divider fluid="strue" clearing />
            <Card.Header>{props.image.description}</Card.Header>
            <Icon name='history'/>{props.image.createdAt}
            </Card.Content>
        </Card>
    )
}; 

export default ImageItem; 