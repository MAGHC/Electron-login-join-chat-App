import { Card, Button } from "@mui/material";

const Channel = ({ channelName, handleUpdateChannel }: { channelName: string; handleUpdateChannel: Function }) => {
  return (
    <Button
      onClick={() => {
        handleUpdateChannel(channelName);
      }}
      variant="contained"
      sx={{ margin: "1rem  0", width: "100%", height: "2rem" }}
    >
      채널명 : {channelName}
    </Button>
  );
};

export default Channel;
