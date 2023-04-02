import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { width: "100%", marginTop: 24 },
  content: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 50,
    backgroundColor: "#303030",
  },
  contentBlack: { backgroundColor: "#1a1a1a", flex: 1, paddingBottom: 0 },
  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 24,
  },
  subtitle: { color: "#fff", textAlign: "center" },
});

export default styles;
