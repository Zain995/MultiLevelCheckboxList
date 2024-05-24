import React, { ReactNode } from "react";
import { Platform, StyleProp, StyleSheet, TextStyle } from "react-native";
import { Text as NativeText, TextProps as NativeTextProps } from "react-native";

import { defaultColors } from "../styles/colors";

export type TextType = "h1" | "h2" | "body" | "bold" | "regular";

export interface TextProps {
    onPress?: () => void;
    /** Content inside of Text */
    children: ReactNode;
    /** Text presets - defaults to body */
    type?: TextType;
    /** Passing custom styling to text
     * Will overwrite the type styling */
    customStyles?: {
        color?: typeof defaultColors.TEXT_MUTED;
        fontSize?: 10 | 12 | 14 | 16;
        fontStyle?: "italic";
        fontWeight?: "300" | "400" | "500";
    };
    /** Container style */
    style?: StyleProp<TextStyle>;
    numberOfLines?: number;
    testID?: string;
    ellipsizeMode?: NativeTextProps['ellipsizeMode'];
}

const Text = ({ children, numberOfLines, type = "regular", customStyles, onPress, style: propStyle, testID, ellipsizeMode }: TextProps) => {
    /** For styles, we select either custom or preset(type) and for android also append fontFamily */
    // const style = [customStyles || styles[type]];
    const style = [customStyles || styles[type], Platform.OS === "android" && { fontFamily: "Roboto" }, propStyle];
    return (
        <NativeText
            testID={testID}
            numberOfLines={numberOfLines}
            ellipsizeMode={ellipsizeMode}
            selectable={false}
            onPress={onPress}
            style={style}
            allowFontScaling={false}>
            {children}
        </NativeText>
    );
};

const styles = StyleSheet.create({
    body: {
        color: defaultColors.TEXT_MUTED,
        fontSize: 14,
        fontWeight: "400",
    },
    bold: {
        color: defaultColors.TEXT_MUTED,
        fontSize: 14,
        fontWeight: "500",
    },
    h1: {
        color: defaultColors.TEXT_NORMAL,
        fontSize: 16,
        fontWeight: "500",
    },
    h2: {
        color: defaultColors.TEXT_NORMAL,
        fontSize: 14,
        fontWeight: "500",
    },
    regular: {
        color: defaultColors.TEXT_NORMAL,
        fontSize: 14,
        fontWeight: "400",
    },
});

export default Text;
