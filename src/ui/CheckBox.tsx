import React, { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

import { defaultColors } from "../styles/colors";
import Text from "../ui/Text";

import DefaultButton, { DefaultButtonProps } from "../ui/DefaultButton";

export interface CheckBoxProps extends Pick<DefaultButtonProps, "style" | "testID"> {
    checked: boolean;
    onPress: () => void;
    label: string;
}

const CheckBox = ({ checked, label, onPress, style, testID }: CheckBoxProps) => {
    return (
        <>
            <View style={styles.container}>
                <DefaultButton
                    onPress={onPress}
                    testID={testID}
                    style={[
                        styles.circleBase,
                        checked ? styles.selected : styles.deselected,
                        label ? { marginRight: 8 } : undefined,
                        style,
                    ]}>
                    <View style={styles.checkbox} />
                </DefaultButton>
                <Text>{label}</Text>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    checkbox: { width: 14, height: 14, borderRadius: 7, backgroundColor: defaultColors.WHITE },
    circleBase: {
        alignItems: "center",
        backgroundColor: defaultColors.WHITE,
        borderRadius: 20,
        height: 24,
        justifyContent: "center",
        width: 24,
    },
    container: { alignItems: "center", flexDirection: "row" },
    deselected: {
        borderColor: defaultColors.ICON_GREYED,
        borderWidth: 1,
    },
    selected: { backgroundColor: defaultColors.PRIMARY },
});

export default CheckBox;
