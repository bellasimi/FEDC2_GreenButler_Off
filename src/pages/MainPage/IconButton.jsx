import Icon from 'components/basic/Icon';

const IconButton = ({ children, name, onClick, size = 15 }) => {
  const style = {
    borderRadius: '0',
    backgroundColor: 'transparent',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  return (
    <button style={style} onClick={onClick}>
      <Icon name={name} size={size} />
      {children}
    </button>
  );
};

export default IconButton;
