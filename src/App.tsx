import { Button } from "@fluentui/react-components";
import { Add24Regular } from "@fluentui/react-icons";
import { useToast } from "./core/feedback/Toast/ToastProvider.tsx";
import NavigationRail from "./core/navigation/NavigationRail.tsx";
import MainContent from "@/core/layout/MainContent.tsx";

function App() {
  const snackbar = useToast();

  return (
    <>
      <NavigationRail>
        <Button appearance="subtle" icon={<Add24Regular />} />
        <Button appearance="subtle" icon={<Add24Regular />} />
      </NavigationRail>
      <MainContent header="Header">
        <div>
          <Button onClick={() => snackbar.open("Probando Success", "success")}>
            Hello Fluent Design
          </Button>
        </div>
      </MainContent>
    </>
  );
}

export default App;
