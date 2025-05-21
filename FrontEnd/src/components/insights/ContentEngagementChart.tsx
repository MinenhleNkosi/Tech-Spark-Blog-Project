
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltipContent
} from "@/components/ui/chart";

interface ContentEngagementChartProps {
  data: Array<{
    name: string;
    blogViews: number;
    userEngagement: number;
    projectViews: number;
  }>;
  chartConfig: Record<string, { label: string; color: string }>;
}

export const ContentEngagementChart: React.FC<ContentEngagementChartProps> = ({ 
  data, 
  chartConfig 
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Content Engagement</CardTitle>
        <CardDescription>Blog posts and project engagement analysis</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-[700px] w-full">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="blogViews" name="Blog Views" fill="#8884d8" />
                <Bar dataKey="projectViews" name="Project Views" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};
