import { useRouter } from "next/router";
import { HiDotsVertical } from "react-icons/hi";
import { Card, Grid, Text } from "@geist-ui/react";

const DocumentRow = ({ id, data }) => {
  const router = useRouter();

  return (
    <Card hoverable style={{ marginBottom: "1em", cursor: "pointer" }}>
      <Grid.Container onClick={() => router.push(`/doc/${id}`)}>
        <Grid md={12} alignItems="center">
          <Text h4 size="medium">
            {data.file_name}  
          </Text>
        </Grid>
        <Grid md={6} alignItems="center" justify="flex-end">
          <Text p>{data.timestamp.toDate().toLocaleDateString()}</Text>
        </Grid>

        <Grid md={6} alignItems="center" justify="flex-end">
          <HiDotsVertical size="1em" />
        </Grid>
      </Grid.Container>
    </Card>
  );
};

export default DocumentRow;
