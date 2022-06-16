import Header from 'components/Header/Header';
import Navigation from 'components/Navigation';
import theme from 'styles/theme';

const { headerHeight, navHeight, pagePadding } = theme.value;

const PageWrapper = ({ children, header, nav }) => {
  const wrapperStyle = {
    paddingTop: header ? headerHeight : 0,
    paddingLeft: pagePadding,
    paddingRight: pagePadding,
    paddingBottom: nav ? navHeight : 0,
  };

  return (
    <div style={{ ...wrapperStyle }}>
      <Header />
      {children}
      <Navigation />
    </div>
  );
};

export default PageWrapper;
