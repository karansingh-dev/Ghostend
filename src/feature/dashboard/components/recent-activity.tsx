import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import getRecentActivity from "@/feature/dashboard/queries/getRecentActivity";
import clsx from "clsx";
import { formatDistanceToNow } from "date-fns";

export default async function RecentActivity() {
  const recentActivity = await getRecentActivity();

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity, i) => {
              const { apiMethod, endPointName } = activity.ghostApi;
              const timeAgo = formatDistanceToNow(new Date(activity.calledAt), {
                addSuffix: true,
              });

              return (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border bg-muted/20 p-4 transition-colors hover:bg-muted/40"
                >
                  <div className="flex items-start gap-4">
                    {/* Status dot */}
                    <div className="mt-2 h-2 w-2 rounded-full bg-green-400" />

                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="font-medium">API Call</span>
                        <Badge
                          variant="outline"
                          className={clsx(
                            "h-5 px-2 text-xs border",
                            apiMethod === "GET" && "text-green-700  ",
                            apiMethod === "POST" && "text-blue-700 ",
                            apiMethod === "PUT" && "text-yellow-700  ",
                            apiMethod === "DELETE" && "text-red-700 "
                          )}
                        >
                          {apiMethod}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">{endPointName}</span> •{" "}
                        {timeAgo}
                      </p>
                    </div>
                  </div>

                  <Badge
                    variant="outline"
                    className={clsx(
                      activity.ghostApi.isActive
                        ? "text-green-600"
                        : "text-rose-600"
                    )}
                  >
                    {activity.ghostApi.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
