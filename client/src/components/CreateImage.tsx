import * as React from 'react'; 
import { Form, Button } from 'semantic-ui-react';
import { getUploadUrl, uploadFile } from '../api/images-api';
import Auth from '../auth/Auth'; 

enum UploadState {
    NoUpload,
    FetchingPresignedUrl,
    UploadingFile,
}  

interface CreateImageProps {
    match: {
        params: {
            imageId: string,
        }
    },
    auth: Auth
}

interface CreateImageState {
    description: string, 
    file: any, 
    uploadState: UploadState, 
}

const CreateImage: React.FC<CreateImageProps> = (props) => {

    // define initial value of states: 
    const [description, setDescription] = React.useState<CreateImageState['description']>(''); 
    const [file, setFile] = React.useState<CreateImageState['file']>(undefined); 
    // UploadState initially has no upload: 
    const [uploadState, setUploadState] = React.useState<CreateImageState['uploadState']>(UploadState.NoUpload); 

    // handle input change of description: 
    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value); 
    }; 

    // hangle file change:
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files; 

        if (!files) { return; }

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
            // get S3 Pre-signed URL: 
            setUploadState(UploadState.FetchingPresignedUrl);
            const uploadUrl =  await getUploadUrl(props.auth.getIdToken(), props.match.params.imageId);

            // update UploadState to UploadingFile: 
            // upload file to S3 bucket via Presigned-URL:
            setUploadState(UploadState.UploadingFile); 
            await uploadFile(uploadUrl, file); 

            alert('File was uploaded!'); 
        } catch(e) {
            alert('Could not upload an image: ' + e.message); 
        } finally {
            // reset UploadState to NoUpload: 
            setUploadState(UploadState.NoUpload); 
        }
    }


    const renderButton = () => {
        return (
            <div>
                {uploadState === UploadState.FetchingPresignedUrl 
                    && (<p>Uploading image metadata</p>)
                }
                {uploadState === UploadState.UploadingFile
                    && (<p>Uploading file</p>)
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

            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label>Description</label>
                    <input 
                        placeholder="Image Description"
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Image</label>
                    <input 
                        type="file"
                        accept="image/*"
                        placeholder="Image to upload"
                        onChange={handleFileChange}
                    />
                </Form.Field>
                <Button>Upload</Button>
                {/* {renderButton} */}
            </Form>
        </div>
    ); 
}; 

export default CreateImage; 