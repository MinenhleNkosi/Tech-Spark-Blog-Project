
import { 
  LineChart, 
  Line, 
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

interface UserEngagementChartProps {
  data: Array<{
    name: string;
    blogViews: number;
    userEngagement: number;
    projectViews: number;
  }>;
  chartConfig: Record<string, { label: string; color: string }>;
}

export const UserEngagementChart: React.FC<UserEngagementChartProps> = ({ 
  data, 
  chartConfig 
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>User Engagement</CardTitle>
        <CardDescription>Interactions per user type</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[700px] w-full">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="userEngagement"
                  name="User Engagement"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};
