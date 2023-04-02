import { FlatList, ScrollView, Text, View } from "react-native";

import { listCategoriesMock } from "./mock";
import styles from "./styles";
import { ItemList } from "../../components/ItemList";

export interface IListCategories {
  id: string;
  title: string;
  order: number;
}

export const List = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Categorias</Text>
        <Text style={styles.subtitle}>
          Define a sequência de assunto que você mais gosta no topo da lista
        </Text>
      </View>
      <View style={[styles.content, styles.contentBlack]}>
        <FlatList
          keyExtractor={(item) => item.id}
          data={listCategoriesMock}
          renderItem={({ item }) => (
            <ItemList title={item.title} onPress={() => {}} />
          )}
          style={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};
