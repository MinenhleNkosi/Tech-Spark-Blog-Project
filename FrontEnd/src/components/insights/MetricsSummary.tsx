
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface MetricItemProps {
  title: string;
  value: string | number;
  change: string;
}

const MetricItem: React.FC<MetricItemProps> = ({ title, value, change }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{change}</p>
      </CardContent>
    </Card>
  );
};

interface MetricsSummaryProps {
  metrics: {
    blogViews: { value: string | number; change: string };
    userEngagement: { value: string | number; change: string };
    normalUsers: { value: string | number; change: string };
    visitors: { value: string | number; change: string };
  };
  // Make timeframe optional by adding ? to the property
  timeframe?: string;
}

export const MetricsSummary: React.FC<MetricsSummaryProps> = ({ metrics }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricItem
        title="Total Blog Views"
        value={metrics.blogViews.value}
        change={metrics.blogViews.change}
      />
      <MetricItem
        title="User Engagement"
        value={metrics.userEngagement.value}
        change={metrics.userEngagement.change}
      />
      <MetricItem
        title="Normal Users"
        value={metrics.normalUsers.value}
        change={metrics.normalUsers.change}
      />
      <MetricItem
        title="Visitors"
        value={metrics.visitors.value}
        change={metrics.visitors.change}
      />
    </div>
  );
};
