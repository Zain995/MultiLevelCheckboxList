import React, { ReactNode, useCallback, useMemo, useState } from "react";

export interface NodeDataProps {
    id: string;
    level: number;
   name: string;
}


interface StoreContextInterface {
    nodeIds: string[];
    nodesData: NodeDataProps[];
    onNodePress: (selectedItem: NodeDataProps, value: boolean) => void;
    onRemoveNodes: (ids: string[]) => void;
}

export const StoreContext = React.createContext({} as StoreContextInterface);

const StoreContextProvider = ({ children }: { children: ReactNode }) => {
    // state
    const [nodesData, setNodesData] = useState<NodeDataProps[]>([]);

    // 
    const nodeIds = useMemo(() => {
        const ids = nodesData.map(node => node.id);
        console.log(`ids = ${JSON.stringify(ids)}`)
        return ids;
    }, [nodesData]);

    // add / remove nodes based on checkbox value
    const onNodePress = useCallback((selectedItem: NodeDataProps, value: boolean) => {
        if (value) {
            setNodesData(prev => [...prev, selectedItem]);
        } else {
            setNodesData(prev => prev.filter(item => item.id !== selectedItem.id));
        }
    }, [setNodesData]);

    // remove multiple nodes
    const onRemoveNodes = useCallback((ids: string[]) => {
        if (ids) {
            setNodesData(prev => prev.filter(item => !ids.includes(item.id)));
        }
    }, [nodesData]);

    return (
        <StoreContext.Provider value={{ nodeIds, nodesData, onNodePress, onRemoveNodes }}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;