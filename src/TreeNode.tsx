import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { StyleSheet } from "react-native";

import DefaultButton from "./ui/DefaultButton";
import CheckBox from "./ui/CheckBox";
import { TreeNode } from "./utils/generateNode";
import { StoreContext } from "./Store";

export interface TreeNodeComponentProps {
    level: number;
    node: TreeNode;
    parentId?: string;
    isParentChecked?: boolean;
}

const TreeNodeComponent = ({ level, node, parentId, isParentChecked }: TreeNodeComponentProps) => {

    // context
    const { nodeIds, onNodePress, onRemoveNodes } = useContext(StoreContext);

    // state
    const [expanded, setExpanded] = useState(false);
    const [checked, setChecked] = useState(false);

    const isChecked = useMemo(() => {
        if (isParentChecked || nodeIds.includes(node.id)) {
            return true;
        } else if (parentId && nodeIds.includes(parentId)) {
            return true;
        } else if (node.children) {
            return node.children?.every((item) => nodeIds.includes(item.id));
        }
        return false;
    }, [isParentChecked, parentId, checked, node, nodeIds])



    const onCheckboxPress = useCallback(() => {
        if (isChecked && node.children) {
            onRemoveNodes(node.children?.map(item => item.id));
        }
        onNodePress({
            id: node.id,
            level,
            name: node.name,
        }, !isChecked);
        setChecked(!isChecked);
    }, [isChecked, node]);

    const renderChildren = useMemo(() => {
        if (expanded && node.children) {
            return node.children.map((item, index) => (
                <TreeNodeComponent
                    level={level + 1}
                    key={index}
                    node={item}
                    parentId={node.id}
                    isParentChecked={isChecked}
                />
            ))
        }
        return null;
    }, [isChecked, expanded, level, node]);

    return (
        <DefaultButton style={styles.container} onPress={() => setExpanded((prev) => !prev)}>
            <CheckBox testID={`${node.id}-checkbox`} label={node.name} checked={isChecked} onPress={onCheckboxPress} />
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
