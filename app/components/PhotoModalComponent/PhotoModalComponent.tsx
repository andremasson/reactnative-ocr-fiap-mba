import React from 'react'
import { View, Image, Modal, TouchableOpacity } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';

interface Props {
    uri: string,
    onClose: Function,
    onOk: Function
}

const PhotoModalComponent = (props: Props) => {
    const {uri, onClose, onOk} = props;
    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={true}
        >
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', margin: 20}}>
                <TouchableOpacity style={{margin: 10}} onPress={() => onClose()} >
                    <Ionicons name="close" size={32} color="#ff0000" />
                </TouchableOpacity>

                <Image style={{ width: '100%', height: 300, borderRadius: 20 }} source={{ uri: uri }} />

                <TouchableOpacity style={{margin: 10}} onPress={() => onOk()} >
                    <Ionicons name="save" size={32} color="blue" />
                </TouchableOpacity>
            </View>
        </Modal>
    );
}

export default PhotoModalComponent
