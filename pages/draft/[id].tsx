import { ProductResponseInterface } from "../../src/types/product";
import useSWR from "swr";
import Error from "next/error";
import Loader from "../../src/components/Loader";
import { useRouter } from "next/router";

const Draft = () => {
  const router = useRouter();
  const draftSWR = useSWR(`/product/draft/${router.query.id}`);

  const draft: ProductResponseInterface = draftSWR.data;

  if (draftSWR.error) {
    return <Error title="Unexpected error occured" statusCode={500} />;
  }

  if (!draft) {
    return <Loader />;
  }

  return (
    <div className="container">
      <header>{draft.name}</header>
      <div className="shortDesc">{draft.shortDescription}</div>
      <div className="longDesc">{draft.longDescription}</div>
      <style jsx>{`
        .container {
          padding: 0 1em;
        }
        header {
          font-size: 1.4rem;
          margin: 1em;
          text-transform: uppercase;
        }
        .gridContainer {
          display: grid;
          grid-template-columns: 200px 1fr;
          align-items: center;
          font-size: 1.1rem;
        }
      `}</style>
    </div>
  );
};

export default Draft;
