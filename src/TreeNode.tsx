import React, { useCallback, useContext, useMemo, useState } from "react";
import { StyleSheet } from "react-native";

import DefaultButton from "./ui/DefaultButton";
import CheckBox from "./ui/CheckBox";
import { TreeNode } from "./utils/generateNode";
import { StoreContext } from "./Store";
import { MAX_LEVEL } from "./App";

export interface TreeNodeComponentProps {
    level: number;
    node: TreeNode;
    parentId?: string;
    parentNode?: TreeNode;
}

const TreeNodeComponent = ({ level, node, parentId, parentNode }: TreeNodeComponentProps) => {

    // context
    const { newNodeIds, onNodePress, onNodeWithoutChildrenPress } = useContext(StoreContext);

    // state
    const [expanded, setExpanded] = useState(false);
    const [checked, setChecked] = useState(false);

    const isChecked = useMemo(() => {        
        if (newNodeIds?.find(item => item?.id === node?.id)) {
            return node?.children?.every((item) => newNodeIds?.find(item => item?.id === node?.id)?.children?.includes(item?.id));
        } else if (parentId && newNodeIds?.find(item => item?.id === parentId)) {
            return newNodeIds?.find(item => item?.id === parentId)?.children?.includes(node?.id);
        }
        return false;
    }, [parentId, checked, node, newNodeIds])



    const onCheckboxPress = useCallback(() => {
        if (level >= (MAX_LEVEL - 2)) {
            if (level == (MAX_LEVEL - 1) && parentNode) {
                onNodeWithoutChildrenPress({
                    id: node.id,
                    level,
                    name: node.name,
                }, parentNode, !isChecked);
            } else {
                onNodePress({
                    id: node.id,
                    level,
                    name: node.name,
                }, node, !isChecked);
            }
            setChecked(!isChecked);
        }
    }, [isChecked, node, newNodeIds]);

    const renderChildren = useMemo(() => {
        if (expanded && node.children) {
            return node.children.map((item, index) => (
                <TreeNodeComponent
                    level={level + 1}
                    key={index}
                    node={item}
                    parentId={node.id}
                    parentNode={node}
                />
            ))
        }
        return null;
    }, [isChecked, expanded, level, node]);

    return (
        <DefaultButton style={styles.container} onPress={() => setExpanded((prev) => !prev)}>
            <CheckBox testID={`${node.id}-checkbox`} label={node.name} checked={isChecked || false} onPress={onCheckboxPress} />
            {renderChildren}
        </DefaultButton>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        paddingTop: 12,
    }
});

export default TreeNodeComponent;
