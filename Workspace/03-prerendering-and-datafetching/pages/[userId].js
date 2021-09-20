const UserIdPage = (props) => {
  return <h1>{props.id}</h1>;
};

export default UserIdPage;

/*
      We can't pre-rendered this page because we don't know which users will have in advance
      and we don't get access to their cookies in advance.
  
      getServerSideProps runs for every incoming request. so 'revalidate' does not make sense here
  */
export async function getServerSideProps(context) {
  const { params } = context;
  return {
    props: {
      id: params.userId,
    },
  };
}
