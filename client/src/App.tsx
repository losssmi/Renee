import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import { Landing } from "@/pages/Landing";
import { Dashboard } from "@/pages/Dashboard";
import { MyRenegade } from "@/pages/MyRenegade";
import { VisionGoals } from "@/pages/VisionGoals";
import { KPIs } from "@/pages/KPIs";
import { Sales } from "@/pages/Sales";
import { Login } from "@/pages/Login";
import { ChooseUsername } from "@/pages/ChooseUsername";
import { WorkLocation } from "@/pages/WorkLocation";
import { Welcome } from "@/pages/Welcome";
import { Step1 } from "@/pages/Step1";
import { Step2Strategy } from "@/pages/Step2Strategy";
import { Step3Structure } from "@/pages/Step3Structure";
import { Step4Accountability } from "@/pages/Step4Accountability";
import { AssessmentIntro } from "@/pages/AssessmentIntro";

function Router() {
  return (
    <Switch>
      {/* Add pages below */}
      <Route path="/" component={Landing} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Login} />
      <Route path="/choose-username" component={ChooseUsername} />
      <Route path="/work-location" component={WorkLocation} />
      <Route path="/welcome" component={Welcome} />
      <Route path="/step1" component={Step1} />
      <Route path="/step2-strategy" component={Step2Strategy} />
      <Route path="/step3-structure" component={Step3Structure} />
      <Route path="/step4-accountability" component={Step4Accountability} />
      <Route path="/assessment-intro" component={AssessmentIntro} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/my-renegade" component={MyRenegade} />
      <Route path="/vision-goals" component={VisionGoals} />
      <Route path="/kpis" component={KPIs} />
      <Route path="/sales" component={Sales} />
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
