
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContentEngagementChart } from "@/components/insights/ContentEngagementChart";
import { UserEngagementChart } from "@/components/insights/UserEngagementChart";
import { DistributionChart } from "@/components/insights/DistributionChart";
import { MetricsSummary } from "@/components/insights/MetricsSummary";
import { TopContentTable } from "@/components/insights/TopContentTable";
import {
  chartConfig,
  userTypeData,
  engagementData,
  topContentData,
  getTimeframeData,
  getMetricsByTimeframe
} from "@/components/insights/insightData";

export default function Insights() {
  const [timeframe, setTimeframe] = useState("weekly");
  
  // Get data based on selected timeframe
  const currentData = getTimeframeData(timeframe);
  const metrics = getMetricsByTimeframe(timeframe);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Insights</h1>
          <p className="text-muted-foreground">
            Analyze platform performance and user engagement metrics.
          </p>
        </div>
      </div>
      
      <Tabs defaultValue="weekly" onValueChange={setTimeframe}>
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="weekly" className="space-y-4">
          <MetricsSummary metrics={metrics} />
        </TabsContent>
        
        <TabsContent value="monthly" className="space-y-4">
          <MetricsSummary metrics={metrics} />
        </TabsContent>
        
        <TabsContent value="yearly" className="space-y-4">
          <MetricsSummary metrics={metrics} />
        </TabsContent>
        
        {/* Charts Section */}
        <div className="grid gap-6 mt-6">
          {/* Content Engagement Chart */}
          <ContentEngagementChart data={currentData} chartConfig={chartConfig} />
          
          {/* User Engagement Chart */}
          <UserEngagementChart data={currentData} chartConfig={chartConfig} />
        </div>
        
        {/* Distribution Charts */}
        <div className="grid gap-6 md:grid-cols-2 mt-6">
          {/* User Types Distribution */}
          <DistributionChart 
            title="User Types Distribution"
            description="Normal users vs Visitors"
            data={userTypeData}
          />
          
          {/* Engagement Distribution */}
          <DistributionChart 
            title="Engagement Distribution"
            description="How users engage with the platform"
            data={engagementData}
          />
        </div>
        
        {/* Top Content Table */}
        <TopContentTable items={topContentData} />
      </Tabs>
    </div>
  );
}
