import { useState } from "react";
import Animated, {
  SharedValue,
  runOnJS,
  useAnimatedStyle,
  withSpring,
  useAnimatedReaction,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";

import { CARD_HEIGHT, IItemList, ItemList } from "../ItemList";
import styles from "./styles";

interface IMovableCard {
  data: IItemList;
  cardsPosition: SharedValue<number[]>;
  scrollY: SharedValue<number>;
  cardsCount: number;
}

const MovableCard: React.FC<IMovableCard> = ({
  data,
  cardsPosition,
  cardsCount,
  scrollY,
}) => {
  const [moving, setMoving] = useState(false);
  const top = useSharedValue(cardsPosition.value[data.id] * CARD_HEIGHT);

  const objectMove = (positions: number[], from: number, to: number) => {
    "worklet";
    const newPositions = Object.assign({}, positions);

    for (const id in positions) {
      if (positions[id] === from) {
        newPositions[id] = to;
      }

      if (positions[id] === to) {
        newPositions[id] = from;
      }
    }

    return newPositions;
  };

  useAnimatedReaction(
    () => cardsPosition.value[data.id],
    (currentPosition, previousPosition) => {
      if (currentPosition !== previousPosition) {
        if (!moving) {
          top.value = withSpring(currentPosition * CARD_HEIGHT);
        }
      }
    },
    [moving]
  );

  const longPressGesture = Gesture.LongPress()
    .onStart(() => {
      runOnJS(setMoving)(true);
    })
    .minDuration(200);

  const panGesture = Gesture.Pan()
    .manualActivation(true)
    .onTouchesMove((_, state) => {
      moving ? state.activate() : state.fail();
    })
    .onUpdate((e) => {
      const positionY = e.absoluteY + scrollY.value;
      top.value = positionY - CARD_HEIGHT;

      const startPosition = 0;
      const endPosition = cardsCount - 1;
      const currentPosition = Math.floor(positionY / CARD_HEIGHT);

      const newPosition = Math.max(
        startPosition,
        Math.min(currentPosition, endPosition)
      );

      ("worklet");
      if (newPosition !== cardsPosition.value[data.id]) {
        cardsPosition.value = objectMove(
          cardsPosition.value,
          cardsPosition.value[data.id],
          newPosition
        );
      }
    })
    .onFinalize(() => {
      const newPosition = cardsPosition.value[data.id] * CARD_HEIGHT;
      top.value = withSpring(newPosition);
      runOnJS(setMoving)(false);
    })
    .simultaneousWithExternalGesture(longPressGesture);

  const animatedStyle = useAnimatedStyle(
    () => ({
      top: top.value - CARD_HEIGHT,
      opacity: withSpring(moving ? 1 : 0.4),
      zIndex: moving ? 1 : 0,
    }),
    [moving]
  );

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <GestureDetector gesture={Gesture.Race(panGesture, longPressGesture)}>
        <ItemList {...data} />
      </GestureDetector>
    </Animated.View>
  );
};

export default MovableCard;
