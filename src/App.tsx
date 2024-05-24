/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useMemo } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
} from 'react-native';

import StoreContextProvider from './Store';
import TreeView from "./TreeView";
import { generateTreeList } from "./utils/generateNode"
import SelectedLabels from './SelectedLabels';
import Text from './ui/Text';

export const MAX_LEVEL = 4;

function App(): React.JSX.Element {

  const treeViewData = useMemo(() => generateTreeList(5, MAX_LEVEL, 6) , []);

  return (
    <StoreContextProvider>
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle='dark-content' />
            <Text style={styles.headerText}>Browse Products</Text>
            <ScrollView horizontal={true}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 100}}>
                    <TreeView nodes={treeViewData} />
                    <Text style={styles.selectedVariantsText}>Selected Variants</Text>
                    <SelectedLabels />
                </ScrollView>
            </ScrollView>
        </SafeAreaView>
    </StoreContextProvider>
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        flex: 1
    },
    selectedVariantsText: {
        marginTop: 20,
        marginLeft: 20,
        fontSize: 16,
        fontWeight: '500'
    },
    headerText: {
        marginVertical: 20,
        fontSize: 16,
        fontWeight: '500',
        alignSelf: 'center'
    }
});

export default App;
