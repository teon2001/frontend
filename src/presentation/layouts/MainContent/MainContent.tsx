import { memo, PropsWithChildren } from "react";
import "../../components/forms/Food/FoodForm.scss";

/**
 * Here we declare the main content of the page, it wraps all its children in a main tag.
 */
export const MainContent = memo(({ children }: PropsWithChildren) => {
  return (
  <main>
    {children}
  </main>
  );
});
