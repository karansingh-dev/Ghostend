import AnalyticsComponent from "@/feature/dashboard/components/analytics-component";
import RecentActivity from "@/feature/dashboard/components/recent-activity";

export default function Page() {
  return (
    <div className="min-h-screen bg-background p-8 space-y-10">
      {/* header section  */}
      <div id="heading" className="space-y-2">
        <h2 className="font-semibold text-2xl">Dashboard</h2>
        <div>
          <div className="text-md text-foreground/50 flex justify-between">
            <span> Overview of your Ghost APIs and recent activity</span>
          </div>
        </div>
      </div>

      {/* Analytics section */}
      <AnalyticsComponent />

      {/* Recent Activity  */}

      <RecentActivity />
    </div>
  );
}
