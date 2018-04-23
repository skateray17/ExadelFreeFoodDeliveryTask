import './header.css';
import Handlebars from 'handlebars';
import template from './header.hbs';

// Handlebars.registerHelper("isManager", function(context, options) {
//   if(context.userRole){
//     return options.fn(this);
//   }
// });

Handlebars.registerHelper('link', function(text, options) {
  console.log(options.hash['href']);   //значение, лежащее в poem.url
  console.log(options.hash['class']); //"poem"
  return new Handlebars.SafeString("<a href=\"" + options.hash['href'] + "\">" + Handlebars.escapeExpression(text) + "</a>");
});

export default class Header{
  constructor(){
  }

  render(target, props){
    return template(props);
  }
}