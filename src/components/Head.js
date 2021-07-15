import NextHead from "next/head";

const Head = ({ title, description, children }) => {
  const DEFAULT_DESC = "Write anything, everywhere, with just one click.";

  return (
    <NextHead>
      {title ? <title>Docs - {title}</title> : <title>Docs</title>}
      <meta name="description" content={description || DEFAULT_DESC} />

      {children}
    </NextHead>
  );
};

export default Head;
