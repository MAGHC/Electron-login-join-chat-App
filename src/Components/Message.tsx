import { Card } from "@mui/material";
import { useEffect, useRef } from "react";

const Message = ({ message }: { message: string }) => {
  const messageComponent = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    if (messageComponent.current === null) {
    } else messageComponent.current.scrollIntoView();
  });

  return (
    <Card ref={messageComponent} sx={{ width: "50%", margin: ".5rem 0" }} variant="outlined">
      <pre>{message}</pre>
    </Card>
  );
};

export default Message;
