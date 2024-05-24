import React, { useContext, useMemo } from "react";
import { StyleSheet, View } from "react-native";

import TreeNodeComponent from "./TreeNode";
import { TreeNode } from "./utils/generateNode";
import { StoreContext } from "./Store";
import { MAX_LEVEL } from "./App";
import Text from "./ui/Text";

export interface SelectedLabelsProps {
    nodes: TreeNode[];
}

const SelectedLabels = () => {
    // context
    const { nodesData } = useContext(StoreContext);
    
    const labels = useMemo(() => {
        return nodesData.filter(node => node.level >= MAX_LEVEL - 2)
        .map(node => {
            if (node.level === MAX_LEVEL - 1) {
                return (
                    <View key={node?.id} style={styles.selectedContainer}>
                        <Text>{node.name}</Text>
                    </View>
                );
            } else if (node.level === MAX_LEVEL - 2) {
                return (
                    <View key={node?.id} style={styles.selectedContainer}>
                        <Text>All item of {node.name}</Text>
                    </View>
                )
            }
            return;
        })
    }, [nodesData]);

    return labels;
};

export default SelectedLabels;

const styles = StyleSheet.create({
    selectedContainer: {
        backgroundColor: 'grey',
        borderRadius: 4,
        borderWidth: 1,
        padding: 5,
        marginTop: 10,
        marginLeft: 10
    }
});