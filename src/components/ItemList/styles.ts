import { StyleSheet } from "react-native";

export const HEIGHT = 60;
export const MARGIN_BOTTOM = 12;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#6b6b6b",
    padding: 15,
    minHeight: HEIGHT,
    maxHeight: HEIGHT,
    borderRadius: 8,
    alignItems: "center",
  },
  title: {
    flex: 1,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  button: {
    padding: 5,
  },
});

export default styles;
