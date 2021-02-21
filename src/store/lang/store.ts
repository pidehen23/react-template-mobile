import { ILangState } from './type';

const initialState: ILangState = {
  local: 'zh_CN',
  langList: [
    { key: 'zh_CN', name: '中文' },
    { key: 'en', name: 'English' }
  ] // 可选的语言列表
};

export default initialState;
