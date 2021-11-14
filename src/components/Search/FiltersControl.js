import React,{useState} from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, Menu } from 'react-native-paper'

export default function FiltersControl({filter, setFilter}) {

    const [visible, setVisible] = useState(false)

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

    const changeFilter = (value, label) =>{
        setFilter({value, label})
        closeMenu()
    }

    return (
        <View style={styles.containerControls}>
            <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={
                    <Button mode="contained" onPress={openMenu} icon="sort" style={styles.filtersButton}>
                        Ordenar por: {filter.label}
                    </Button>}
            >
                <Menu.Item 
                    title="A-Z" 
                    icon="sort-alphabetical-descending-variant" 
                    onPress={()=>changeFilter("az","A-Z")} 
                />
                <Menu.Item 
                    title="Z-A" 
                    icon="sort-alphabetical-ascending-variant" 
                    onPress={()=>changeFilter("za","Z-A")} 
                />
                <Menu.Item 
                    title="Menor precio" 
                    icon="cash" 
                    onPress={()=>changeFilter("minorprice","Menor precio")} 
                />
                <Menu.Item 
                    title="Mayor precio" 
                    icon="cash-multiple" 
                    onPress={()=>changeFilter("mayorprice","Mayor precio")} 
                />
                <Menu.Item 
                    title="Mas nuevos" 
                    icon="alert-decagram"
                    onPress={()=>changeFilter("minortime","Mas nuevos")}  
                />
            </Menu>
        </View>
    )
}

const styles = StyleSheet.create({
    containerControls:{
        padding:10,
        flexDirection:"row",
        justifyContent:"flex-end",
        borderBottomColor:"#D4D4D4",
        borderBottomWidth:1
    },
    filtersButton:{
        // width:"100%",
        padding:5
    }
})
