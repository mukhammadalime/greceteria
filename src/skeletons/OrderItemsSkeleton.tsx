import Skeleton from "@mui/material/Skeleton";

const OrderItemsSkeleton = () => {
  return (
    <>
      {Array.from({ length: 10 }).map((_, i: number) => (
        <tr className="table__item" key={i}>
          <td>
            <Skeleton variant="rounded" width="60%" />
          </td>
          <td>
            <Skeleton variant="rounded" width="90%" />
          </td>
          <td>
            <Skeleton variant="rounded" width="90%" />
          </td>
          <td>
            <Skeleton variant="rounded" width="90%" />
          </td>
          <td>
            <Skeleton variant="rounded" width="90%" />
          </td>
        </tr>
      ))}
    </>
  );
};

export default OrderItemsSkeleton;
