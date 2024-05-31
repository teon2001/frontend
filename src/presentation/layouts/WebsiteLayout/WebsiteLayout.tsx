import { Box } from "@mui/material";
import { Footer } from "../Footer";
import { MainContent } from "../MainContent";
import { Navbar } from "../Navbar";
import { Fragment, memo, PropsWithChildren } from "react";
import "../../components/forms/Food/FoodStyle.scss";

/**
 * This component should be used for all pages in the application, it wraps other components in a layout with a navigation bar and a footer.
 */
export const WebsiteLayout = memo(
  (props: PropsWithChildren<{}>) => {
    const { children } = props;
    const drawerWidth = 240;

    return (
      <Box sx={{ display: 'flex' }}>
          <Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, width: `calc(100% - ${drawerWidth}px)` }}>
          {children}
        </Box>
      </Box>
    );
  }
);


