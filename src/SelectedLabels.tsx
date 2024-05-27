import React, { useContext, useMemo } from "react";
import { StyleSheet, View } from "react-native";

import { TreeNode } from "./utils/generateNode";
import { StoreContext } from "./Store";
import { MAX_LEVEL } from "./App";
import Text from "./ui/Text";

export interface SelectedLabelsProps {
    nodes: TreeNode[];
}

const SelectedLabels = () => {
    // context
    
    const { newNodesData } = useContext(StoreContext);
    
    const labels = useMemo(() => {
        return newNodesData.filter(node => node.level >= MAX_LEVEL - 2)
        .map(node => {
            if (node.children?.length !== node?.totalChildren) {
                return (
                    <View key={node?.id} style={styles.selectedContainer}>
                        <Text>{node.name}: {node?.children?.map((item => `${item?.name}, `))}</Text>
                    </View>
                );
            } else {
                return (
                    <View key={node?.id} style={styles.selectedContainer}>
                        <Text>All item of {node.name}</Text>
                    </View>
                )
            }
            return;
        })
    }, [newNodesData]);

    return labels;
};

export default SelectedLabels;

const styles = StyleSheet.create({
    selectedContainer: {
        maxWidth: '95%',
        backgroundColor: 'grey',
        borderRadius: 4,
        borderWidth: 1,
        padding: 5,
        marginTop: 10,
        marginLeft: 10
    }
});