import { Card, Box } from "@mui/material";
import { useEffect, useRef } from "react";

const Message = ({
  message,
  displayName,
  userState,
}: {
  message: string;
  displayName: string;
  userState: {
    displayName?: string;
  };
}) => {
  const messageComponent = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    if (messageComponent.current === null) {
    } else messageComponent.current.scrollIntoView();
  });

  return (
    <>
      {userState.displayName === displayName ? (
        <Box sx={{ display: "flex", justifyContent: "flex-end" }} ref={messageComponent}>
          <Card sx={{ width: "45%", margin: ".5rem .5rem" }} variant="outlined">
            <pre>{message}</pre>
            <Box sx={{ paddingRight: "1rem", textAlign: "right" }}>by {displayName}</Box>
          </Card>
        </Box>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "flex-start" }} ref={messageComponent}>
          <Card sx={{ width: "50%", margin: ".5rem 0" }} variant="outlined">
            <pre>{message}</pre>
            <Box sx={{ paddingRight: "1rem", textAlign: "right" }}>by {displayName}</Box>
          </Card>
        </Box>
      )}
    </>
  );
};

export default Message;
