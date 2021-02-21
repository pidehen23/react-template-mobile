import React, { PropsWithChildren, useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd-mobile';
import { useParams } from 'react-router-dom';
import { RouteComponentProps } from 'react-router-dom';

import '../style/demo.less';
import demeImage from '../assets/good.jpg';
import { IStoreState } from '@/store/type';
import { IDemoState } from '@/store/demo/type';
import { decrementCount, incrementCount } from '@/store/demo/action';
interface IProps {
  [key: string]: any;
}

const Demo1 = (props: PropsWithChildren<IProps & RouteComponentProps>) => {
  const {} = props;
  const { language } = useParams<RouterParams>();
  const dispatch = useDispatch();
  const demo = useSelector<IStoreState, IDemoState>(state => state.demo);

  // 获取详情
  useEffect(() => {
    const getUserInfo = () => {
      void window.apis
        .getUserInfo<{ name: string }>({
          params: { id: 110 },
          rest: { id: 1 }
        })
        .then(res => {
          console.log('success:', res);
        })
        .catch(err => {
          console.log('error:', err);
        });
    };
    void getUserInfo();
  }, []);

  // 获取详情
  useEffect(() => {
    const postFriendList = () => {
      void window.apis
        .postFriendList<{ name: string }>({
          data: { token: 110 }
        })
        .then(res => {
          console.log('success:', res);
        })
        .catch(err => {
          console.log('error:', err);
        });
    };
    void postFriendList();
  }, []);

  const increment = () => {
    dispatch(incrementCount(1));
  };

  const decrement = () => {
    dispatch(decrementCount(-1));
  };
  if (demo.count === 6) {
    throw new Error('测试错误遮罩层！');
  }

  const onNextPage = () => {
    window.router.push({
      pathname: `/${language}/take-photo`,
      state: { name: window.router.location.pathname }
    });
  };

  return (
    <div styleName="demo">
      <div styleName="header">
        <h1>{demo.count}</h1>
        <p styleName="title">无敌是多么寂寞-888888</p>
      </div>
      <div styleName="content">
        <Button style={{ marginBottom: '10px' }} type="primary" onClick={increment}>
          +
        </Button>
        <Button onClick={decrement}>-</Button>
      </div>
      <img styleName="image" src={demeImage} alt="" />
      <hr />
      <Button type="warning" onClick={onNextPage}>
        导航
      </Button>
    </div>
  );
};

export default memo(Demo1);
