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
          margin: 0.5em 0;
        }
      `}</style>
    </header>
  );
};

export default PageHeader;
