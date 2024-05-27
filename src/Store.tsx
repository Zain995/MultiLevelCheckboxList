import React, { ReactNode, useCallback, useMemo, useState } from "react";
import { TreeNode } from './utils/generateNode';
export interface NodeDataProps {
    id: string;
    level: number;
    name: string;
};

export interface NodeIdsProps {
    id: string;
    children?: string[];
};

export interface NewNodeDataProps {
    id: string;
    level: number;
    name: string;
    totalChildren: number;
    children?: NodeDataProps[];
};


interface StoreContextInterface {
    newNodeIds: NodeIdsProps[];
    newNodesData: NewNodeDataProps[];
    onNodePress: (selectedItem: NodeDataProps, node: TreeNode, value: boolean) => void;
    onNodeWithoutChildrenPress: (selectedItem: NodeDataProps, parent: TreeNode, value: boolean) => void;
}

export const StoreContext = React.createContext({} as StoreContextInterface);

const StoreContextProvider = ({ children }: { children: ReactNode }) => {
    // state
    const [newNodesData, setNewNodesData] = useState<NewNodeDataProps[]>([]);

    const newNodeIds = useMemo(() => {
        const ids = newNodesData.map((node) => { return {id: node.id, children: node?.children?.map(child => child?.id) || ['']}});
        console.log(`newNodeIds = ${JSON.stringify(ids)}`)
        console.log(`newNodesData = ${JSON.stringify(newNodesData)}`)
        return ids;
    }, [newNodesData]);

    // add / remove parent nodes based on checkbox value
    const onNodePress = useCallback((selectedItem: NodeDataProps, node: TreeNode, value: boolean) => {
        if (value) {
            const existingNode = newNodesData?.find((item) => item?.id == node?.id);
            if (existingNode) {
                const index = newNodesData?.indexOf(existingNode);
                newNodesData?.splice(index, 1);                
            } 
            const tempNodeData = {
                id: selectedItem?.id,
                name: selectedItem?.name,
                level: selectedItem?.level,
                totalChildren: node?.children?.length || 0,
                children: node?.children?.map((item) => {
                    return {
                        id: item?.id,
                        name: item?.name,
                        level: selectedItem?.level + 1,
                    }
                })
            }
            setNewNodesData(prev => [...prev, tempNodeData]);
        } else {            
            setNewNodesData(prev => prev.filter(item => item.id !== selectedItem.id));
        }
    }, [setNewNodesData, newNodesData]);

    // add / remove child nodes based on checkbox value
    const onNodeWithoutChildrenPress = useCallback((selectedItem: NodeDataProps, parent: TreeNode, value: boolean) => {
        
        let tempNodeList :NewNodeDataProps[]  = [];
        const existingNode = newNodesData?.find((item) => item?.id == parent?.id);
        let tempList = [...newNodesData];
        
        if (value) {
            if (existingNode) {
                const index = tempList?.indexOf(existingNode);
                const tempChildrenList = tempList[index]?.children || [];
                tempChildrenList.push(selectedItem);
                tempNodeList = tempList;
            } else {
                const tempNode = {
                    id: parent?.id,
                    level: selectedItem?.level - 1,
                    totalChildren: parent?.children?.length || 0,
                    name: parent?.name,
                    children: [selectedItem],
                }
                tempList.push(tempNode);
                tempNodeList = tempList;
            }
            setNewNodesData(tempNodeList);
        } else {
            if (existingNode && existingNode?.children && existingNode?.children?.length > 0) {
                const index = tempList?.indexOf(existingNode);
                let tempChildrenList = tempList[index]?.children || [];
                tempList[index].children = tempChildrenList?.filter(item => item?.id !== selectedItem?.id);
                if (tempList[index]?.children?.length === 0) {
                    tempList?.splice(index, 1);
                }
                tempNodeList = tempList;
            }
            setNewNodesData(tempNodeList);
        }
    }, [setNewNodesData, newNodesData]);

    return (
        <StoreContext.Provider value={{ newNodeIds, newNodesData, onNodePress, onNodeWithoutChildrenPress }}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;