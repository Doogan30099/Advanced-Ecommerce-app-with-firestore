const Footer = () => {
  return (
    <footer>
      <p><a href="/admin" className="text-light text-decoration-none">©</a> {new Date().getFullYear()} All rights reserved.</p>
      <p className=" text-center mt-auto small mb-0 ">
        Built using React, Redux Toolkit, and React Query.
      </p>
    </footer>
  );
};

export default Footer;
