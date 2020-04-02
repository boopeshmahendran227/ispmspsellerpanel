interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = (props: PageLayoutProps) => (
  <div className="container">
    {props.children}
    <style jsx>{`
      .container {
        display: grid;
        grid-row-gap: 1.2em;
        width: 100%;
        max-width: 1170px;
        margin: auto;
      }
    `}</style>
  </div>
);

export default PageLayout;
