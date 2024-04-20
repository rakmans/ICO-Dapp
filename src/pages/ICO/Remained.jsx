import { Card, Avatar, Typography, CardContent } from "@mui/material";
import { separateNumber } from "../../utils/separateNumber";
import { UilWallet } from "@iconscout/react-unicons";

const Remained = ({ props }) => {
  return (
    <Card sx={{ width: "22%", height: 220, borderRadius: 7 }}>
      <CardContent>
        <Avatar sx={{ p: 0.5, bgcolor: `#9ccc65` }}>
          <UilWallet />
        </Avatar>
        <Typography variant="h5" mt={1}>
          Remained Tokens
        </Typography>
        <Typography variant="h5" mt={1} ml={2}>
          {props === "loading" || props === "you not connected"
            ? props
            : separateNumber(props).toString()}
        </Typography>
        <Typography mt={3} variant="body2">
          Tokens remained in ICO
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Remained;
