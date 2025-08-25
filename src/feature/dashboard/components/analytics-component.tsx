import { Card, CardContent } from "@/components/ui/card";
import getAllCounts from "@/feature/dashboard/queries/getAllCounts";
import clsx from "clsx";
import { BarChart3, Code, Zap } from "lucide-react";

export default async function AnalyticsComponent() {
  const analyticsData = await getAllCounts();
  const Cards = [
    {
      id: "totalApis",
      title: "Total Apis",
      value: analyticsData.totalApiCount,
      icon: Code,
      iconName: "code",
    },
    {
      id: "totalApiCalls",
      title: "Total Api Call Today",
      value: analyticsData.totalApiCallsToday,
      icon: BarChart3,
      iconName: "barChar3",
    },
    {
      id: "activeEndpoints",
      title: " Active Endpoints",
      value: analyticsData.activeEndpoint,
      icon: Zap,
      iconName: "zap",
    },
  ];

  return (
    <div className="space-y-4">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Cards.map(({ id, title, value, icon: Icon, iconName }) => {
            return (
              <Card key={id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{title}</p>
                      <p className="text-2xl font-bold">{value}</p>
                    </div>

                    <Icon
                      className={clsx(
                        "h-8 w-8",
                        iconName == "code" && "text-blue-300",
                        iconName == "barChar3" && "text-red-300 ",
                        iconName == "zap" && "text-green-300"
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
