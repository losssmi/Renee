import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import { DashboardPreview } from "@/pages/DashboardPreview";
import { Login } from "@/pages/Login";
import { ChooseUsername } from "@/pages/ChooseUsername";
import { WorkLocation } from "@/pages/WorkLocation";
import { Welcome } from "@/pages/Welcome";
import { AssessmentIntro } from "@/pages/AssessmentIntro";

function Router() {
  return (
    <Switch>
      {/* Add pages below */}
      <Route path="/login" component={Login} />
      <Route path="/choose-username" component={ChooseUsername} />
      <Route path="/work-location" component={WorkLocation} />
      <Route path="/welcome" component={Welcome} />
      <Route path="/assessment-intro" component={AssessmentIntro} />
      <Route path="/dashboard" component={DashboardPreview} />
      <Route path="/" component={Login} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
