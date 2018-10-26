import React,{Component} from 'react';
import {Field,reduxForm} from 'redux-form';
class PostsNew extends Component{


//  {...field.input} 相当于是 将onChange={field.input.onChange} onFocus={field.input.onFocus} 等都添加到其中
//传递的field参数用于交互<field>标签 与component jsx标签
//{field.label}获取label属性
renderTitleField(field){
    return(
        <div className="form-group">
        <label>{field.label}</label>
          <input
            className="form-control"
            title="text"
            {...field.input}
          />

        </div>
    );
}

  render(){
    //component明确了要展示怎样的内容。
    return (
        <form>
            <Field
              label="title"
              name="title"
              component={this.renderTitleField}
            />
            <Field
            label="tags"
              name="tags"
              component={this.renderTitleField}
            />
            <Field
              label="content"
              name="content"
              component={this.renderTitleField}
            />
        </form>
    );
  }
}

//保证'PostNewForm'特殊，类似于
export default reduxForm({
  form:'PostNewForm'
})(PostsNew);
