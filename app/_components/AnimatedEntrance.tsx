
import React, { useEffect } from 'react';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSpring,
    withTiming
} from 'react-native-reanimated';

interface AnimatedEntranceProps {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    scale?: boolean;
}

export default function AnimatedEntrance({
    children,
    delay = 0,
    duration = 600,
    direction = 'up',
    scale = false
}: AnimatedEntranceProps) {
    const opacity = useSharedValue(0);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const scaleVal = useSharedValue(scale ? 0.95 : 1);

    const offset = 20;

    useEffect(() => {
        if (direction === 'up') translateY.value = offset;
        if (direction === 'down') translateY.value = -offset;
        if (direction === 'left') translateX.value = offset;
        if (direction === 'right') translateX.value = -offset;

        opacity.value = withDelay(delay, withTiming(1, { duration, easing: Easing.out(Easing.back(1)) }));
        translateX.value = withDelay(delay, withSpring(0, { damping: 15 }));
        translateY.value = withDelay(delay, withSpring(0, { damping: 15 }));
        if (scale) {
            scaleVal.value = withDelay(delay, withSpring(1));
        }
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [
            { translateX: translateX.value },
            { translateY: translateY.value },
            { scale: scaleVal.value }
        ],
    }));

    return (
        <Animated.View style={animatedStyle}>
            {children}
        </Animated.View>
    );
}
