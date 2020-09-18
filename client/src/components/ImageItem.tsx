import * as React from 'react'; 
import { Card, Image } from 'semantic-ui-react'; 
import ImageModel from '../type-interfaces/ImageModel'; 

interface ImageCardProps {
    image: ImageModel, 
}; 

const ImageItem = (props: ImageCardProps) => {
    return (
        <Card>
            <Card.Content>
                <Card.Header centered>{props.image.description}</Card.Header>
                {props.image.imageUrl && (
                    <Image src={props.image.imageUrl} />
                )}
            <Card.Description>{props.image.createdAt}</Card.Description>
            </Card.Content>
        </Card>
    )
}; 

export default ImageItem; 