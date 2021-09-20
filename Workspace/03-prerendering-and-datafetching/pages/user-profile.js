const UserProfilePage = (props) => {
  return <h1>{props.username}</h1>;
};

export default UserProfilePage;

/*
    We can't pre-rendered this page because we don't know which users will have in advance
    and we don't get access to their cookies in advance.

    getServerSideProps runs for every incoming request. so 'revalidate' does not make sense here
*/
export async function getServerSideProps(context) {
  return {
    props: {
      username: 'Sameer',
    },
  };
}
