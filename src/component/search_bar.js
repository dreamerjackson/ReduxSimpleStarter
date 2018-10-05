//必须要导入React，记住即便是最简单的jsx语法  return <input />;，也是调用了React.createElement
import React from 'react';

const SearchBar = ()=>{

  return <input />;
};

//文件之间是相互独立的，我们必须要使用导出功能，这样其他文件才能够导入我们的模块。
export default SearchBar;
