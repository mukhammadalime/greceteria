import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

const RatingsStars = (props: {
  notRatingsQuantity: boolean;
  ratingsAverage: number;
}) => {
  return (
    <ul className="ratings">
      <Box
        sx={{
          "& > legend": { mt: 2 },
        }}
      >
        <Rating
          name="text-feedback"
          value={4}
          readOnly
          precision={0.1}
          emptyIcon={
            <StarIcon style={{ fill: "#999999a5" }} fontSize="inherit" />
          }
        />
      </Box>
      {!props.notRatingsQuantity && (
        <li className="ratings__number">
          <span>({props.ratingsAverage})</span>
        </li>
      )}
    </ul>
  );
};

export default RatingsStars;
