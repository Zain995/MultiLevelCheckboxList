import React from "react";
import { StyleSheet } from "react-native";

import TreeNodeComponent from "./TreeNode";
import { TreeNode } from "./utils/generateNode";

export interface TreeViewProps {
    nodes: TreeNode[];
}

const TreeView = ({ nodes }: TreeViewProps) => {
    return nodes.map((item, index) => (
        <TreeNodeComponent level={0} key={index} node={item} />
    ));
};

const styles = StyleSheet.create({
    
});

export default TreeView;
