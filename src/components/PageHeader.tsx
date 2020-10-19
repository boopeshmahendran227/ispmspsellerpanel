interface PageHeaderProps {
  children: React.ReactNode;
}

const PageHeader = (props: PageHeaderProps) => {
  return (
    <header>
      {props.children}
      <style jsx>{`
        header {
          font-size: 1.5rem;
          margin: 0.3em 0;
          font-weight: bold;
        }
      `}</style>
    </header>
  );
};

export default PageHeader;
