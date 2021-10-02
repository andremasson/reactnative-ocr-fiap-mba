import React, {useEffect} from 'react'
import { View } from 'react-native'
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { useAppDispatch } from '../../redux/hooks';
import { setCameraPermission, setMediaPermission } from '../../redux/appConfig';

interface Props {
    
}

const ConfigComponent = (props: Props) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        (async () => {
            let cameraPermission = await Camera.getCameraPermissionsAsync();
            if (!cameraPermission.granted) {
                cameraPermission = await Camera.requestCameraPermissionsAsync();
            }

            let mediaLibraryPermissions = await MediaLibrary.getPermissionsAsync();
            if (!mediaLibraryPermissions.granted) {
                mediaLibraryPermissions = await MediaLibrary.requestPermissionsAsync();
            }
            
            dispatch(setCameraPermission(cameraPermission.granted));
            dispatch(setMediaPermission(mediaLibraryPermissions.granted));
        })();
    }, []);

    return (
        <View>
        </View>
    )
}

export default ConfigComponent
