import React, { ReactNode, useMemo } from "react";
import { Platform, Pressable, PressableProps, StyleProp, ViewStyle } from "react-native";

import { TestProps } from "../types";
import { defaultColors } from "../styles/colors";

export interface DefaultButtonProps extends Pick<PressableProps, "hitSlop">, TestProps {
    /** Children to be passed to it */
    children: ReactNode;
    /** Container style */
    style?: StyleProp<ViewStyle>;
    /** Callback when user presses the button */
    onPress?: () => void;
}

/** Generic button container */
const DefaultButton = ({ children, hitSlop, onPress, style, testID }: DefaultButtonProps) => {
    const androidRipple = useMemo(() => ({
        color: defaultColors.BLACK,
        radius: 300,
    }), []);

    return (
        <Pressable
            hitSlop={hitSlop}
            onPress={onPress}
            android_ripple={androidRipple}
            style={({ pressed }) => [
                {
                    opacity: Platform.OS === "android" ? 1 : pressed ? 0.5 : 1,
                },
                style,
            ]}
        >
            {children}
        </Pressable>
    );
};

export default DefaultButton;
