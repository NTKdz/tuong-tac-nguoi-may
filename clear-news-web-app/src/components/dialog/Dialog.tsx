import { Box, Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import * as React from "react";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CustomDialog({
  title,
  content,
  onClose,
  onOpen,
}: {
  title: React.ReactNode;
  content: React.ReactNode;
  onClose: (type: string) => void;
  onOpen: () => void;
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    onOpen();
  };

  const handleClose = () => {
    setOpen(false);
    onClose("cancel");
  };

  return (
    <React.Fragment>
      <Box onClick={handleClickOpen}>{title}</Box>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        maxWidth="md"
      >
        <Box sx={{ padding: "32px" }}>
          {content}
          <Box
            sx={{
              display: "flex",
              width: "100%",
              marginTop: "32px",
              justifyContent: "right",
            }}
          >
            <Button
              variant="contained"
              sx={{ marginRight: "8px" }}
              onClick={() => {
                setOpen(false);
                onClose("cancel");
              }}
            >
              cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setOpen(false);
                onClose("save");
              }}
            >
              save
            </Button>
          </Box>
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
