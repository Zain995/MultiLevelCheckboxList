import { fireEvent, render, waitFor } from '@testing-library/react-native'
import React from 'react'

import StoreContextProvider from './Store';
import TreeView from './TreeView';
import TreeNodeComponent from "./TreeNode";
import { TreeNode } from './utils/generateNode';
import DefaultButton from './ui/DefaultButton';

const mockNodes: TreeNode[] = [
    {id: "1", name: "1", children: [{ id: "2", name: "2" }, { id: "7", name: "7" }]},
    {id: "3", name: "3", children: [{ id: "4", name: "4" }]},
    {id: "5", name: "5", children: [{ id: "6", name: "6" }]}
]

describe('Treeview Tests', () => {


    it('renders initial nodes correctly', async () => {
        const { UNSAFE_getAllByType } = renderContent();
        expect(UNSAFE_getAllByType(TreeNodeComponent).length).toEqual(mockNodes.length);
    });

    it('display child notes of pressed item', async () => {
        const { UNSAFE_getAllByType } = renderContent();
        fireEvent.press(UNSAFE_getAllByType(DefaultButton)[0]);
        expect(UNSAFE_getAllByType(TreeNodeComponent).length).toEqual(mockNodes.length + mockNodes[0].children?.length!);
    });

    const renderContent = () => render(
        <StoreContextProvider>
            <TreeView nodes={mockNodes} />
        </StoreContextProvider>
    );
})

