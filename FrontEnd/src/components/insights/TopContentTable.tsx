
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TopContentItem {
  title: string;
  type: string;
  views: number;
  engagement: number;
  publishDate: string;
}

interface TopContentTableProps {
  items: TopContentItem[];
}

export const TopContentTable: React.FC<TopContentTableProps> = ({ items }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Performing Content</CardTitle>
        <CardDescription>Most viewed blog posts and projects</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Engagement</TableHead>
              <TableHead>Publish Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.views}</TableCell>
                <TableCell>{item.engagement}</TableCell>
                <TableCell>{item.publishDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
