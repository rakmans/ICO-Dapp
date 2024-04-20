import { Card, Avatar, Typography, CardContent } from "@mui/material";
import { UilDollarSign } from "@iconscout/react-unicons";
import { separateNumber } from "../../utils/separateNumber";

const Supply = ({ props }) => {
  return (
    <Card sx={{ width: "22%", height: 220, borderRadius: 7 }}>
      <CardContent>
        <Avatar sx={{ p: 0.5, bgcolor: `#ef5350` }}>
          <UilDollarSign />
        </Avatar>
        <Typography variant="h5" mt={1}>
          Total Supply
        </Typography>
        <Typography variant="h5" mt={1} ml={2}>
          {props === "loading" || props === "you not connected"
            ? props
            : separateNumber(props).toString()}
        </Typography>
        <Typography mt={3} variant="body2">
          Total number of Tokens
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Supply;
