import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './CameraComponentStyle';
import PhotoModal from '../PhotoModalComponent/PhotoModalComponent';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { useAppSelector } from '../../redux/hooks';

interface Props {
    
}

const CameraComponent = (props: Props) => {
    const [hasCameraPermission, setHasCameraPermission] = useState(false);
    const [hasMediaPermission, setHasMediaPermission] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [lastPhotoUri, setLastPhotoUri] = useState('');
    const [type, setType] = useState(Camera.Constants.Type.back);
    const albumName = 'OCR App';
    let cameraRef: Camera | null;
    
    const storeCameraPermission = useAppSelector((state) => state.appConfigReducer.cameraPermission);
    const storeMediaPermission = useAppSelector((state) => state.appConfigReducer.mediaPermission);

    useEffect(() => {
        (async () => {
            setHasCameraPermission(storeCameraPermission);
            setHasMediaPermission(storeMediaPermission);
        })();
    }, []);

    const snapPhoto = async () => {
        if (cameraRef) {
            let photo = await cameraRef.takePictureAsync();
            setLastPhotoUri(photo.uri);
            setShowModal(true);
        }
    }

    const processPhoto = async () => {
        if (hasMediaPermission) {
            const newPhoto = await MediaLibrary.createAssetAsync(lastPhotoUri);
            const album = await MediaLibrary.getAlbumAsync(albumName);
            if (album) {
                await MediaLibrary.addAssetsToAlbumAsync([newPhoto], album, false);
            } else {
                await MediaLibrary.createAlbumAsync(albumName, newPhoto, false);
            }
        }
        setShowModal(false);
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
