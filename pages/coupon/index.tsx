import CSSConstants from "../../src/constants/CSSConstants";
import SortableTable from "components/atoms/SortableTable";
import useSWR from "swr";
import Loader from "components/atoms/Loader";
import { CouponInterface } from "types/coupon";
import PageError from "components/atoms/PageError";
import { formatPrice } from "utils/misc";
import PageHeader from "components/atoms/PageHeader";
import WithAuth from "components/atoms/WithAuth";
import Link from "next/link";
import moment from "moment";
import PageHeaderContainer from "components/atoms/PageHeaderContainer";
import PageContainer from "components/atoms/PageContainer";
import { Button } from "@chakra-ui/core";

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

const Coupons = (): JSX.Element => {
  const swr = useSWR<CouponInterface[]>("/sellercoupon");
  const coupons: CouponInterface[] | undefined = swr.data;
  const error = swr.error;

  if (error) {
    return <PageError statusCode={error.response?.status} />;
  }
  if (!coupons) {
    return <Loader />;
  }

  return (
    <PageContainer>
      <PageHeaderContainer>
        <PageHeader>Seller Coupons</PageHeader>
        <Link href="/coupon/create">
          <Button variantColor="primaryColorVariant">Create New Coupon</Button>
        </Link>
      </PageHeaderContainer>
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
    </PageContainer>
  );
};

export default WithAuth(Coupons);
