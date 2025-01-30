import { Text, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

import MovableCard from "../../components/MovableCard";
import { CARD_HEIGHT } from "../../components/ItemList";

import { listCategoriesMock } from "./mock";
import styles from "./styles";

export interface IListCategories {
  id: string;
  title: string;
}

const listToObject = (list: typeof listCategoriesMock) => {
  const listOfObject = Object.values(list);

  const newListOfObject: any = {};

  listOfObject.forEach((card, index) => {
    newListOfObject[card.id] = index;
  });

  return newListOfObject;
};

const List = () => {
  const scrollY = useSharedValue(0);
  const cardsPosition = useSharedValue(listToObject(listCategoriesMock));

  const handleScroll = useAnimatedScrollHandler((e) => {
    scrollY.value = e.contentOffset.y;
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Categorias</Text>
        <Text style={styles.subtitle}>
          Define a sequência de assunto que você mais gosta no topo da lista
        </Text>
      </View>
      <View style={[styles.content, styles.contentBlack]}>
        <Animated.ScrollView
          style={styles.list}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          contentContainerStyle={{
            height: CARD_HEIGHT * listCategoriesMock.length,
          }}
        >
          {listCategoriesMock.map((listCategories) => (
            <MovableCard
              key={listCategories.id}
              data={listCategories}
              cardsPosition={cardsPosition}
              scrollY={scrollY}
              cardsCount={listCategoriesMock.length}
            />
          ))}
        </Animated.ScrollView>
      </View>
    </View>
  );
};

export default List;
