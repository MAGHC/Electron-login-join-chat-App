import { Card } from "@mui/material";

const Channel = ({ channelName }: { channelName: string }) => {
  return (
    <Card variant="outlined" sx={{ margin: "1rem  0", width: "100%", height: "2rem" }}>
      채널명 : {channelName}
    </Card>
  );
};

export default Channel;
