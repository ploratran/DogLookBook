import * as React from 'react'; 
import { Form, Button } from 'semantic-ui-react';
import Auth from '../auth/Auth'; 

enum UploadState {
    NoUpload, 
    UploadingData, 
    UploadingFile, 
}

interface CreateImageProps {
    auth: Auth, 
}

interface CreateImageState {
    title: string, 
    file: any, 
    uploadState: UploadState, 
}

const CreateImage = (props: CreateImageProps) => {

    // define initial value of states: 
    const [title, setTitle] = React.useState<CreateImageState["title"]>(''); 
    const [file, setFile] = React.useState<CreateImageState["file"]>(undefined); 
    const [uploadState, setUploadState] = React.useState<CreateImageState["uploadState"]>(UploadState.NoUpload); 

    // handle input change of "title" and "file": 
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value); 
    }; 

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files; 

        if (!files) { return; }

        console.log('File change ', file); 
        setFile(files[0]); 
    }; 

    // const setUploadState = (uploadState: UploadState) => {}

    // TODO: 
    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault(); 

        try {
            if (!file) {
                alert('File should be selected'); 
                return; 
            }

            setUploadState(UploadState.UploadingData); 
            
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
                {uploadState === UploadState.UploadingData 
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
                    <label>Title</label>
                    <input 
                        placeholder="Image Title"
                        value={title}
                        onChange={() => handleTitleChange}
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

export default CreateImage; 