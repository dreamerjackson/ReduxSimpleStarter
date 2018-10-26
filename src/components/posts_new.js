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
          {field.meta.error}
        </div>
    );
}

onSubmit(values){
  console.log(values);
}




  render(){
        //handleSubmit这个函数是redux-form自带的
    const {handleSubmit} = this.props;


    //component明确了要展示怎样的内容。
    //当验证ok，就会回调this.onSubmit自定义函数，执行某些功能。
    return (
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field
              label="title"
              name="title"
              component={this.renderTitleField}
            />
            <Field
            label="categories"
              name="categories"
              component={this.renderTitleField}
            />
            <Field
              label="content"
              name="content"
              component={this.renderTitleField}
            />
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
  }
}



function validate(values){
//console.log(values) -> {title:"asdf",}
const errors = {};
//errors.title,errors.categories,  errors.content 必须和  <Field>当中的name属性一致。
if(!values.title){
  errors.title = "Enter a title";
}

if(!values.categories){
  errors.categories = "Enter some categories";
}
if(!values.content){
  errors.content = "Enter some content please";
}
// 如果errors不为空的话，说明输入无效。
return errors;
}


//保证'PostNewForm'特殊，类似于
export default reduxForm({
  validate:validate,
  form:'PostNewForm'
})(PostsNew);
