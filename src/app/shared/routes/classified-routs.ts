import { Routes, RouterModule } from "@angular/router";
// import {ContentPagesModule} from '@appDir/pages/content-pages/content-pages.module';

// Route for content layout without sidebar, navbar and footer for pages like Login, Registration etc...

export const CLASSIFIED_ROUTS: Routes = [
  {
    path: "",
    redirectTo: "post",
    pathMatch: "full",
  },
  {
    path: "post",
    loadChildren: () =>
      import("../../Classified/classified.module").then(
        (m) => m.ClassifiedModule
      ),
  },
];
