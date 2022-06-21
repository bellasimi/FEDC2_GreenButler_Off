import { useEffect, useState, useCallback } from 'react';
import { Icon, PostImageContainer, PageWrapper } from 'components';
import Tab from 'components/basic/Tab';
import { useParams } from 'react-router-dom';
import { initialUserData } from 'contexts/UserContext/reducer';
import { useUserContext } from 'contexts/UserContext';
import { getUser } from 'utils/apis/userApi';
import { getUserPosts, getPostData } from 'utils/apis/postApi';
import { GRID, GRID_ACTIVE, HEART, HEART_ACTIVE } from 'utils/constants/icons/names';
import { UserContainter } from './style';
import UserData from './UserData';
import getUserLevel from 'utils/functions/userLevel/getUserLevel';

const USER_POSTS = 'userPosts';
const LIKE_POSTS = 'likePosts';

const UserPage = () => {
  const { id } = useParams();
  const pageUserId = id;
  const { currentUser } = useUserContext();
  const [user, setUser] = useState(initialUserData.currentUser);
  const [userLevel, setUserLevel] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [userLikePosts, setUserLikePosts] = useState([]);

  const [currentTab, setCurrentTab] = useState(USER_POSTS);

  const onActive = (value) => {
    setCurrentTab(value);
  };

  const handleGetUserPosts = useCallback(async () => {
    if (pageUserId) {
      const { data } = await getUserPosts(pageUserId);
      setUserPosts(data);
    }
  }, [pageUserId]);

  const handleGetUser = useCallback(async () => {
    if (pageUserId) {
      const { data } = await getUser(pageUserId);
      setUser(data);
      const { posts, comments, followers } = data;
      const { level } = getUserLevel({ posts, comments, followers });
      setUserLevel(level);
      await handleGetUserPosts();
    }
  }, [pageUserId, handleGetUserPosts]);

  const handleGetLikePosts = useCallback(async () => {
    const { likes } = user;
    if (likes.length !== 0) {
      const data = await Promise.all(
        likes.map((like) => getPostData(like.post).then((result) => result.data)),
      );
      setUserLikePosts(data);
    }
  }, [user]);

  useEffect(() => {
    handleGetUser();
  }, [pageUserId, handleGetUser]);

  useEffect(() => {
    if (currentTab === LIKE_POSTS && userLikePosts.length === 0) {
      handleGetLikePosts();
    }
  }, [currentTab, handleGetLikePosts, userLikePosts]);

  return (
    <PageWrapper header prev nav info={currentUser.id === pageUserId}>
      <UserContainter>
        <UserData user={user} pageUserId={pageUserId} userLevel={userLevel} />
        <Tab onActive={onActive}>
          <Tab.Item
            icon={{
              active: <Icon name={GRID_ACTIVE} size={24} />,
              inactive: <Icon name={GRID} size={24} />,
            }}
            index={USER_POSTS}
          >
            <PostImageContainer posts={userPosts} />
          </Tab.Item>
          <Tab.Item
            icon={{
              active: <Icon name={HEART_ACTIVE} size={24} />,
              inactive: <Icon name={HEART} size={24} />,
            }}
            index={LIKE_POSTS}
          >
            <PostImageContainer posts={userLikePosts} />
          </Tab.Item>
        </Tab>
      </UserContainter>
    </PageWrapper>
  );
};

export default UserPage;
