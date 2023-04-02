import { TouchableOpacity, View, Text } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import styles, { HEIGHT, MARGIN_BOTTOM } from "./styles";

export const CARD_HEIGHT = HEIGHT + MARGIN_BOTTOM;

export interface IItemList {
  id: string;
  title: string;
}

export const ItemList: React.FC<IItemList> = ({ title }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    <TouchableOpacity style={styles.button}>
      <Icon name="dots-grid" size={22} color="#fff" />
    </TouchableOpacity>
  </View>
);
