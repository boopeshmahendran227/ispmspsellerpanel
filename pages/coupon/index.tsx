import CSSConstants from "../../src/constants/CSSConstants";
import SortableTable from "components/SortableTable";
import useSWR from "swr";
import Loader from "components/Loader";
import { CouponInterface } from "types/coupon";
import PageError from "components/PageError";
import { formatPrice } from "utils/misc";
import Button from "components/atoms/Button";
import PageHeader from "components/PageHeader";
import WithAuth from "components/WithAuth";
import Link from "next/link";
import moment from "moment";

const getTableHeaders = () => {
  return [
    {
      name: "Ecosystem",
      valueFunc: (coupon: CouponInterface) => coupon.ecosystemName,
    },
    {
      name: "Coupon Code",
      valueFunc: (coupon: CouponInterface) => coupon.couponCode,
    },
    {
      name: "Discount",
      valueFunc: (coupon: CouponInterface) =>
        coupon.discountValue || coupon.discountPercentage,
    },
    {
      name: "Minimum Order Amount",
      valueFunc: (coupon: CouponInterface) => coupon.minimumOrderAmount,
    },
    {
      name: "Valid From",
      valueFunc: (coupon: CouponInterface) => new Date(coupon.startDate),
    },
    {
      name: "Valid Till",
      valueFunc: (coupon: CouponInterface) => new Date(coupon.endDate),
    },
  ];
};

const renderTableBody = (coupons: CouponInterface[]) => {
  return coupons.map((coupon) => (
    <tr>
      <td>{coupon.ecosystemName}</td>
      <td className="couponCode">{coupon.couponCode}</td>
      <td className="discount">
        {coupon.discountValue
          ? formatPrice(coupon.discountValue)
          : coupon.discountPercentage + "%"}
      </td>
      <td>{formatPrice(coupon.minimumOrderAmount)}</td>
      <td>{moment.utc(coupon.startDate).local().format("MMMM Do YYYY")}</td>
      <td>{moment.utc(coupon.endDate).local().format("MMMM Do YYYY")}</td>
      <style jsx>{`
        td {
          padding: 1.4em;
        }
        .couponCode {
          color: ${CSSConstants.warningColor};
        }
        .discount {
          color: ${CSSConstants.successColor};
        }
      `}</style>
    </tr>
  ));
};

const Coupons = () => {
  const swr = useSWR("/sellercoupon");
  const coupons: CouponInterface[] = swr.data;
  const error = swr.error;

  if (error) {
    return <PageError statusCode={error.response?.status} />;
  }
  if (!coupons) {
    return <Loader />;
  }

  return (
    <div className="container">
      <div className="headerContainer">
        <PageHeader>Seller Coupons</PageHeader>
        <Link href="/coupon/create">
          <Button>Create New Coupon</Button>
        </Link>
      </div>
      <SortableTable
        initialSortData={{
          index: 1,
          isAsc: false,
        }}
        headers={getTableHeaders()}
        data={coupons}
        emptyMsg="There are no coupons"
        body={renderTableBody}
      />
      <style jsx>{`
        .container {
          padding: 1em;
          margin: 1em auto;
          background: ${CSSConstants.foregroundColor};
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12),
            0 1px 2px rgba(0, 0, 0, 0.24);
        }
        .headerContainer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-right: 1.6em;
        }
        @media (max-width: 800px) {
          .container {
            padding: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default WithAuth(Coupons);
