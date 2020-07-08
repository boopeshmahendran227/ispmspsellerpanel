import CSSConstants from "../../src/constants/CSSConstants";
import SortableTable from "../../src/components/SortableTable";
import useSWR from "swr";
import Loader from "../../src/components/Loader";
import { CouponInterface } from "../../src/types/coupon";
import PageError from "../../src/components/PageError";
import { formatPrice } from "../../src/utils/misc";
import Button from "../../src/components/Button";
import PageHeader from "../../src/components/PageHeader";
import WithAuth from "../../src/components/WithAuth";
import Link from "next/link";

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
      name: "Products",
      valueFunc: (coupon: CouponInterface) => null,
    },
    {
      name: "Category Ids",
      valueFunc: (coupon: CouponInterface) => null,
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
      <td>
        {coupon.products.map((product) => (
          <div className="couponProduct">
            <div className="row">
              <span className="label">ProductId:</span>
              <span className="value">{product.productId}</span>
            </div>
            <div className="row">
              <span className="label">SkuId:</span>
              <span className="value">{product.skuId}</span>
            </div>
          </div>
        ))}
      </td>
      <td>{coupon.categoryIds.join(", ")}</td>
      <style jsx>{`
        .productContainer {
          text-align: initial;
          margin: 1.2em 0;
        }
        .couponProduct {
          margin: 0.5em;
        }
        .couponCode {
          color: ${CSSConstants.warningColor};
        }
        .discount {
          color: ${CSSConstants.successColor};
        }
        tr:hover {
          background-color: ${CSSConstants.hoverColor} !important;
          cursor: pointer;
        }
        .label,
        .value {
          min-width: 80px;
          display: inline-block;
          text-align: left;
        }
        .label {
          font-weight: bold;
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
