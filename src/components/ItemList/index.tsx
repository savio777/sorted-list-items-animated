import { TouchableOpacity, View, Text } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import styles from "./styles";

interface IItemList {
  title: string;
  onPress(): void;
}

export const ItemList: React.FC<IItemList> = ({ onPress, title }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Icon name="dots-grid" size={22} color="#fff" />
    </TouchableOpacity>
  </View>
);
