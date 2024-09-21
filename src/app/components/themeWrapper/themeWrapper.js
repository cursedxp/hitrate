import { useSelector } from "react-redux";
import Header from "../hearder/header";

export default function ThemeWrapper({ children }) {
  const theme = useSelector((state) => state.app.theme);
  return (
    <body className={theme}>
      <Header />
      <main>{children}</main>
    </body>
  );
}
