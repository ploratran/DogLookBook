import * as React from 'react'; 
import { Form, Button } from 'semantic-ui-react';
import Auth from '../auth/Auth'; 

enum UploadState {
    NoUpload,
    FetchingPresignedUrl,
    UploadingFile,
}  

interface EditImageProps {
    match: {
        params: {
            imageId: string,
        }
    },
    auth: Auth
}

interface EditImageState {
    description: string, 
    file: any, 
    uploadState: UploadState, 
}

const EditImage: React.FC<EditImageProps> = (props) => {

    // define initial value of states: 
    const [description, setDescription] = React.useState<EditImageState["description"]>(''); 
    const [file, setFile] = React.useState<EditImageState["file"]>(undefined); 
    // UploadState initially has no upload: 
    const [uploadState, setUploadState] = React.useState<EditImageState["uploadState"]>(UploadState.NoUpload); 

    // handle input change of description: 
    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value); 
        setDescription(e.target.value); 
    }; 

    // hangle file change:
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files; 

        if (!files) { return; }

        console.log('File change ', file); 
        setFile(files[0]); 
    }; 

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault(); 

        try {
            if (!file) {
                alert('File should be selected'); 
                return; 
            }

            // set UploadState when fetch S3 pre-signed url:
            setUploadState(UploadState.FetchingPresignedUrl); 

            console.log('Created image'); 

            setUploadState(UploadState.UploadingFile); 

            console.log('Image was uploaded!'); 
        } catch(e) {
            alert('Could not upload an image: ' + e.message); 
        } finally {
            setUploadState(UploadState.NoUpload); 
        }
    }

    const renderButton = () => {
        return (
            <div>
                {uploadState === UploadState.FetchingPresignedUrl 
                    && <p>Uploading image metadata</p>
                }
                {uploadState === UploadState.UploadingFile
                    && <p>Uploading file</p>
                }
                <Button
                    loading={uploadState !== UploadState.NoUpload}
                    type="submit"
                >
                    Upload
                </Button>
            </div>
        )
    }; 

    return (
        <div>
            <h1>Upload New Image</h1>

            <Form onSubmit={() => handleSubmit}>
                <Form.Field>
                    <label>Description</label>
                    <input 
                        placeholder="Image Description"
                        value={description}
                        onChange={() => handleDescriptionChange}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Image</label>
                    <input 
                        type="file"
                        accept="image/*"
                        placeholder="Image to upload"
                        onChange={() => handleFileChange}
                    />
                </Form.Field>
                {renderButton}
            </Form>
        </div>
    ); 
}; 

export default EditImage; 