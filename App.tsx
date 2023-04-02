import { StatusBar } from "expo-status-bar";
import { List } from "./src/screens/List";

export default function App() {
  return (
    <>
      <StatusBar backgroundColor="#303030" style="light" />
      <List />
    </>
  );
}
