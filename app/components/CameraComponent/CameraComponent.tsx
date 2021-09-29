import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './CameraComponentStyle';
import PhotoModal from '../PhotoModalComponent/PhotoModalComponent';
import appStyles from '../../styles';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';

interface Props {
    
}

const CameraComponent = (props: Props) => {
    const [hasCameraPermission, setHasCameraPermission] = useState(false);
    const [hasStoragePermission, setHasStoragePermission] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [lastPhotoUri, setLastPhotoUri] = useState('');
    const [type, setType] = useState(Camera.Constants.Type.back);
    let cameraRef: Camera | null;

    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraPermission.status === 'granted');
        })();
    }, []);

    const snapPhoto = async () => {
        if (cameraRef) {
            let photo = await cameraRef.takePictureAsync();
            setLastPhotoUri(photo.uri);
            setShowModal(true);
        }
    }

    const processPhoto = () => {

    }

    if (hasCameraPermission === false) {
        return <Text>Sem acesso à câmera</Text>
    }

    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={type} ref={ref => { cameraRef = ref }}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            snapPhoto();
                        }}>
                            <Text style={styles.text}>SNAP</Text>
                    </TouchableOpacity>
                </View>
            </Camera>
            
            { showModal && 
                <PhotoModal 
                    uri={lastPhotoUri}
                    onClose={() => setShowModal(false)}
                    onOk={processPhoto} />
            }
        </View>
    )
}

export default CameraComponent
